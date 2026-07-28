"use client";

import ContentWrapper from "@components/shared/Layouts/Admin/ContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useToast } from "@components/ui/use-toast";
import useUserAuth from "@hooks/auth/useUserAuth";
import {
  DEFAULT_EMAIL_MESSAGE,
  DEFAULT_EMAIL_SUBJECT,
  MAX_PDF_SIZE,
  MAX_PDF_SIZE_LABEL,
  parseEmailList,
} from "lib/validations/bulkEmail";
import { FileText, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Select, { MultiValue, StylesConfig } from "react-select";

interface EmailOption {
  value: string;
  label: string;
}

// Recipients are saved here so they persist across visits.
const STORAGE_KEY = "soower.bulkEmail.recipients";

const readSavedRecipients = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
};

// Each recipient is a separate Resend request, paced to stay under the rate
// limit, so the wait scales with the list. Mirrors SEND_INTERVAL_MS in
// lib/utils/resend.ts. Give the admin an honest estimate before they click.
const formatDuration = (count: number): string => {
  const seconds = Math.ceil(count * 0.15);
  if (seconds < 60) return `${seconds} seconds`;
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
};

const selectStyles: StylesConfig<EmailOption, true> = {
  control: (base) => ({
    ...base,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: "#F4F4F5",
    borderColor: "#E5E7EB",
    boxShadow: "none",
    ":hover": { borderColor: "#9CA3AF" },
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: 9999,
    backgroundColor: "#EEF2FF",
  }),
  multiValueLabel: (base) => ({
    ...base,
    fontSize: ".75rem",
    color: "#3730A3",
  }),
  multiValueRemove: (base) => ({
    ...base,
    borderRadius: 9999,
    color: "#3730A3",
    ":hover": { backgroundColor: "transparent", opacity: 0.7 },
  }),
  placeholder: (base) => ({ ...base, fontSize: ".8rem", color: "#9CA3AF" }),
  input: (base) => ({ ...base, fontSize: ".85rem" }),
};

const BulkEmailComp = () => {
  const { toast } = useToast();
  const { token } = useUserAuth();

  const [pdf, setPdf] = useState<File | null>(null);
  // Lazy init from storage (component is client-only) so the load never races
  // with the save effect below.
  const [recipients, setRecipients] = useState<string[]>(readSavedRecipients);
  const [inputValue, setInputValue] = useState("");
  const [subject, setSubject] = useState(DEFAULT_EMAIL_SUBJECT);
  const [message, setMessage] = useState(DEFAULT_EMAIL_MESSAGE);
  const [sending, setSending] = useState(false);

  // Persist recipients whenever they change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipients));
    } catch {
      // ignore quota / serialization errors
    }
  }, [recipients]);

  const onDrop = useCallback(
    (accepted: File[]) => {
      const file = accepted[0];
      if (!file) return;
      if (file.type !== "application/pdf") {
        toast({ variant: "destructive", title: "Only PDF files are accepted" });
        return;
      }
      if (file.size > MAX_PDF_SIZE) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: `The PDF must be ${MAX_PDF_SIZE_LABEL} or smaller.`,
        });
        return;
      }
      setPdf(file);
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const addEmails = useCallback((raw: string) => {
    const parsed = parseEmailList(raw);
    if (parsed.length === 0) return;
    setRecipients((prev) => {
      const set = new Set(prev);
      parsed.forEach((email) => set.add(email));
      return Array.from(set);
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!inputValue) return;
    if (e.key === "Enter" || e.key === "Tab") {
      addEmails(inputValue);
      setInputValue("");
      e.preventDefault();
    }
  };

  // Committing on a delimiter makes pasting a whole list "just work".
  const handleInputChange = (val: string) => {
    if (/[\s,;]/.test(val)) {
      addEmails(val);
      setInputValue("");
    } else {
      setInputValue(val);
    }
  };

  const handleChange = (next: MultiValue<EmailOption>) => {
    setRecipients(next.map((o) => o.value));
  };

  const value = useMemo<EmailOption[]>(
    () => recipients.map((email) => ({ value: email, label: email })),
    [recipients]
  );

  const handleSend = async () => {
    if (!pdf) {
      toast({ variant: "destructive", title: "Upload a PDF first" });
      return;
    }
    if (recipients.length === 0) {
      toast({ variant: "destructive", title: "Add at least one recipient" });
      return;
    }
    setSending(true);
    try {
      const fd = new FormData();
      fd.append("emails", JSON.stringify(recipients));
      fd.append("pdf", pdf, pdf.name);
      fd.append("subject", subject);
      fd.append("message", message);

      const res = await fetch("/api/bulk-email", {
        method: "POST",
        headers: token ? { authorization: `Bearer ${token}` } : undefined,
        body: fd,
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Send failed",
          description: payload?.message,
        });
        return;
      }
      // EmailJS sends per-recipient, so some can fail while others succeed.
      const failed: { email: string }[] = payload?.failed ?? [];
      toast({
        variant: failed.length ? "destructive" : undefined,
        title: failed.length ? "Sent with errors" : "Notifications sent",
        description: payload.message,
      });
    } catch {
      toast({ variant: "destructive", title: "Could not send notifications" });
    } finally {
      setSending(false);
    }
  };

  return (
    <ContentWrapper title="Upload">
      <div className="mt-6 flex w-full max-w-[760px] flex-col gap-6">
        <p className="text-[.85rem] text-body-2">
          Send a PDF to many recipients at once. Your recipient list is saved,
          so you don&apos;t have to re-enter it next time.
        </p>

        {/* Step 1 — PDF */}
        <section className="rounded-xl border border-gray-200 p-5">
          <h3 className="mb-3 font-body text-[1rem] font-[600]">
            1. Upload PDF
          </h3>
          {!pdf ? (
            <div
              {...getRootProps()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed py-10 transition-colors ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-primary"
              }`}
            >
              <input {...getInputProps()} data-testid="pdf-input" />
              <FileText className="mb-2 text-primary" size={28} />
              <p className="font-body text-[.85rem] text-primary">
                Drag & drop a PDF, or click to browse
              </p>
              <p className="font-body text-[.7rem] text-body-2">
                PDF only · up to {MAX_PDF_SIZE_LABEL}
              </p>
            </div>
          ) : (
            <div
              data-testid="pdf-preview"
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-primary" size={20} />
                <div>
                  <p className="text-[.8rem] font-[500]">{pdf.name}</p>
                  <p className="text-[.7rem] text-body-2">
                    {(pdf.size / 1024).toFixed(0)} KB
                  </p>
                </div>
              </div>
              <button
                aria-label="Remove PDF"
                onClick={() => setPdf(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-grey"
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}
        </section>

        {/* Step 2 — Recipients */}
        <section className="rounded-xl border border-gray-200 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-body text-[1rem] font-[600]">
              2. Recipients{" "}
              <span className="text-body-2">({recipients.length})</span>
            </h3>
            {recipients.length > 0 && (
              <button
                onClick={() => setRecipients([])}
                className="text-[.72rem] text-body-2 underline-offset-2 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div data-testid="recipient-select">
            <Select<EmailOption, true>
              isMulti
              instanceId="recipients"
              inputId="recipient-input"
              value={value}
              inputValue={inputValue}
              onChange={handleChange}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              menuIsOpen={false}
              isClearable={false}
              placeholder="Type or paste emails, then press Enter"
              styles={selectStyles}
              components={{ DropdownIndicator: null }}
            />
          </div>
          <p className="mt-2 text-[.7rem] text-body-2">
            Saved automatically on this device.
          </p>
        </section>

        {/* Step 3 — Message */}
        <section className="rounded-xl border border-gray-200 p-5">
          <h3 className="mb-1 font-body text-[1rem] font-[600]">3. Message</h3>
          <p className="mb-3 text-[.75rem] text-body-2">
            This thank-you note is sent to each donor with the PDF attached.
            Edit it as you like.
          </p>
          <div className="flex flex-col gap-3">
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              data-testid="subject-input"
            />
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={14}
              placeholder="Message to the donor…"
              className="min-h-[300px] leading-relaxed"
              data-testid="message-input"
            />
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="md"
            onClick={handleSend}
            loading={sending}
            disabled={sending || !pdf || recipients.length === 0}
            data-testid="send-btn"
          >
            {recipients.length > 0
              ? `Send to ${recipients.length} recipient${
                  recipients.length === 1 ? "" : "s"
                }`
              : "Send"}
          </Button>
          {recipients.length > 0 && (
            <p className="text-[.72rem] text-body-2">
              Emails go out one at a time — roughly{" "}
              {formatDuration(recipients.length)}. Keep this tab open.
            </p>
          )}
        </div>
      </div>
    </ContentWrapper>
  );
};

const BulkEmailPage = () => (
  <NoSSRWrapper>
    <BulkEmailComp />
  </NoSSRWrapper>
);

export default BulkEmailPage;
