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
  parseEmailList,
} from "lib/validations/bulkEmail";
import type {
  EmailStatus,
  EmailVerificationResult,
} from "lib/utils/emailVerification";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Trash2,
  XCircle,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Select, {
  components,
  MultiValue,
  MultiValueGenericProps,
  MultiValueProps,
  StylesConfig,
} from "react-select";

type RecipientStatus = EmailStatus | "pending";

interface Recipient {
  email: string;
  status: RecipientStatus;
  reason?: string;
}

interface EmailOption {
  value: string;
  label: string;
  status: RecipientStatus;
  reason?: string;
}

const statusColors: Record<
  RecipientStatus,
  { bg: string; text: string; dot: string; label: string }
> = {
  pending: {
    bg: "#F3F4F6",
    text: "#6B7280",
    dot: "#D1D5DB",
    label: "Not verified",
  },
  valid: { bg: "#ECFDF5", text: "#047857", dot: "#22C55E", label: "Valid" },
  disposable: {
    bg: "#FFFBEB",
    text: "#B45309",
    dot: "#F59E0B",
    label: "Toy / disposable",
  },
  invalid: { bg: "#FEF2F2", text: "#DC2626", dot: "#EF4444", label: "Invalid" },
};

// react-select pieces: status-coloured tags + data attributes for testability.
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
  multiValue: (base, state) => ({
    ...base,
    borderRadius: 9999,
    paddingLeft: 4,
    backgroundColor: statusColors[state.data.status].bg,
  }),
  multiValueLabel: (base, state) => ({
    ...base,
    fontSize: ".75rem",
    color: statusColors[state.data.status].text,
  }),
  multiValueRemove: (base, state) => ({
    ...base,
    borderRadius: 9999,
    color: statusColors[state.data.status].text,
    ":hover": { backgroundColor: "transparent", opacity: 0.7 },
  }),
  placeholder: (base) => ({ ...base, fontSize: ".8rem", color: "#9CA3AF" }),
  input: (base) => ({ ...base, fontSize: ".85rem" }),
};

const StatusMultiValue = (props: MultiValueProps<EmailOption, true>) => {
  const { status, value, reason } = props.data;
  return (
    <components.MultiValue
      {...props}
      innerProps={
        {
          ...props.innerProps,
          "data-status": status,
          "data-email": value,
          title: reason || statusColors[status].label,
        } as MultiValueProps<EmailOption, true>["innerProps"]
      }
    />
  );
};

const StatusMultiValueLabel = (
  props: MultiValueGenericProps<EmailOption, true>
) => {
  const data = props.data as EmailOption;
  const color = statusColors[data.status];
  return (
    <components.MultiValueLabel {...props}>
      <span className="inline-flex items-center gap-1.5">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color.dot }}
        />
        {data.label}
      </span>
    </components.MultiValueLabel>
  );
};

const BulkEmailComp = () => {
  const { toast } = useToast();
  const { token } = useUserAuth();

  const [pdf, setPdf] = useState<File | null>(null);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [subject, setSubject] = useState(DEFAULT_EMAIL_SUBJECT);
  const [message, setMessage] = useState(DEFAULT_EMAIL_MESSAGE);
  const [verifying, setVerifying] = useState(false);
  const [sending, setSending] = useState(false);

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
          description: "The PDF must be 10MB or smaller.",
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
      const existing = new Set(prev.map((r) => r.email));
      const additions = parsed
        .filter((email) => !existing.has(email))
        .map<Recipient>((email) => ({ email, status: "pending" }));
      return [...prev, ...additions];
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
    setRecipients(
      next.map((o) => ({ email: o.value, status: o.status, reason: o.reason }))
    );
  };

  const applyResults = (results: EmailVerificationResult[]) => {
    const byEmail = new Map(results.map((r) => [r.email, r]));
    setRecipients((prev) =>
      prev.map((r) => {
        const match = byEmail.get(r.email);
        return match
          ? { email: r.email, status: match.status, reason: match.reason }
          : r;
      })
    );
  };

  const value = useMemo<EmailOption[]>(
    () =>
      recipients.map((r) => ({
        value: r.email,
        label: r.email,
        status: r.status,
        reason: r.reason,
      })),
    [recipients]
  );

  const validCount = useMemo(
    () => recipients.filter((r) => r.status === "valid").length,
    [recipients]
  );
  const disposableCount = useMemo(
    () => recipients.filter((r) => r.status === "disposable").length,
    [recipients]
  );
  const invalidCount = useMemo(
    () => recipients.filter((r) => r.status === "invalid").length,
    [recipients]
  );
  const flaggedCount = disposableCount + invalidCount;

  const buildFormData = (mode: "verify" | "send") => {
    const fd = new FormData();
    fd.append("mode", mode);
    fd.append("emails", JSON.stringify(recipients.map((r) => r.email)));
    if (mode === "send" && pdf) {
      fd.append("pdf", pdf, pdf.name);
      fd.append("subject", subject);
      fd.append("message", message);
    }
    return fd;
  };

  const postBulkEmail = async (mode: "verify" | "send") => {
    const res = await fetch("/api/bulk-email", {
      method: "POST",
      headers: token ? { authorization: `Bearer ${token}` } : undefined,
      body: buildFormData(mode),
    });
    const payload = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, payload };
  };

  const handleVerify = async () => {
    if (recipients.length === 0) {
      toast({ variant: "destructive", title: "Add at least one recipient" });
      return;
    }
    setVerifying(true);
    try {
      const { ok, payload } = await postBulkEmail("verify");
      if (!ok) {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: payload?.message,
        });
        return;
      }
      applyResults(payload.results ?? []);
      const s = payload.summary;
      toast({
        title: "Recipients verified",
        description: `${s.valid} valid · ${s.disposable} toy · ${s.invalid} invalid`,
      });
    } catch {
      toast({ variant: "destructive", title: "Could not verify recipients" });
    } finally {
      setVerifying(false);
    }
  };

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
      const { ok, payload } = await postBulkEmail("send");
      if (payload?.results) applyResults(payload.results);
      if (!ok) {
        toast({
          variant: "destructive",
          title: "Send failed",
          description: payload?.message,
        });
        return;
      }
      toast({ title: "Notifications sent", description: payload.message });
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
          Send a PDF to many recipients at once. We verify every address before
          sending — toy / disposable mailboxes are flagged and skipped.
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
                PDF only · up to 10MB
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
              components={{
                DropdownIndicator: null,
                MultiValue: StatusMultiValue,
                MultiValueLabel: StatusMultiValueLabel,
              }}
            />
          </div>

          {recipients.some((r) => r.status !== "pending") && (
            <div className="mt-3 flex items-center gap-4 text-[.72rem] text-body-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={14} className="text-green-500" />
                {validCount} valid
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle size={14} className="text-amber-500" />
                {disposableCount} toy
              </span>
              <span className="flex items-center gap-1">
                <XCircle size={14} className="text-red-500" />
                {invalidCount} invalid
              </span>
            </div>
          )}
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
            variant="outline"
            size="md"
            onClick={handleVerify}
            loading={verifying}
            disabled={verifying || recipients.length === 0}
            data-testid="verify-btn"
          >
            Verify recipients
          </Button>
          <Button
            size="md"
            onClick={handleSend}
            loading={sending}
            disabled={sending || !pdf || recipients.length === 0}
            data-testid="send-btn"
          >
            {validCount > 0
              ? `Send to ${validCount} valid recipient${
                  validCount === 1 ? "" : "s"
                }`
              : "Send"}
          </Button>
          {flaggedCount > 0 && (
            <span className="text-[.72rem] text-amber-600">
              {flaggedCount} flagged address{flaggedCount === 1 ? "" : "es"}{" "}
              will be skipped.
            </span>
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
