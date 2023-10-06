"use client";
import {
  useGetBanksQuery,
  useVerifyAccountMutation,
  useSaveAccountMutation,
} from "services/payouts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import EmptyState from "@components/shared/EmptyState";
import { Button } from "@components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { InfoCircle } from "react-iconly";
import { useToast } from "@components/ui/use-toast";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { MinistryConnectBankAccount } from "lib/validations/ministry";
import { Input } from "@components/ui/input";
import Loader from "@components/shared/Loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { cn } from "@lib/cn";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/ui/command";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  defaultStep: number;
}

const ConnectBankAccountDialog = ({ setOpen, defaultStep }: Props) => {
  const { toast } = useToast();
  const [verified, setVerified] = useState(false);
  const [bankPopoverOpen, setBankPopoveropen] = useState(false);
  const [verifiedName, setVerifiedName] = useState<null | string>(null);
  const [reference, setReference] = useState<null | string>(null);
  const { data: banks, isLoading } = useGetBanksQuery();
  const [verifyAccount, { isLoading: verifying }] = useVerifyAccountMutation();
  const [saveAccount, { isLoading: saving }] = useSaveAccountMutation();
  const [step, setStep] = useState(defaultStep);
  const form = useForm<z.infer<typeof MinistryConnectBankAccount>>({
    resolver: zodResolver(MinistryConnectBankAccount),
  });

  const onSubmit = async () => {
    if (!reference) {
      toast({
        variant: "destructive",
        title:
          "You account verification didn't return a reference, please use another account",
      });
      return;
    }
    try {
      await saveAccount({
        reference,
      }).unwrap();
      toast({
        title: "Account connected successfully",
      });
      setVerified(false);
      setVerifiedName(null);
      setOpen(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Problem occured connecting your account",
      });
    }
  };

  const verifyEnteredAccount = useCallback(async () => {
    const bankcode = form.watch("bank")?.split(",")[0];
    const accountNumber = form.watch("accountNumber");

    try {
      const res = await verifyAccount({
        bank_code: bankcode,
        account_number: accountNumber,
      }).unwrap();
      setVerified(true);
      setVerifiedName(res.data.accountName);
      setReference(res.data.reference);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to verify account",
      });
      setVerified(false);
      setVerifiedName(null);
    }
  }, [form, toast, verifyAccount]);

  useEffect(() => {
    const valid = form.formState.isValid;
    if (valid) {
      verifyEnteredAccount();
    }
  }, [form.formState.isValid, verifyEnteredAccount]);

  return (
    <DialogContent>
      <div>
        {step === 1 && (
          <div className="flex h-full w-full items-center justify-center px-10">
            <EmptyState
              image={
                <InfoCircle primaryColor="#EB5757" size={60} stroke="light" />
              }
              title="Connect Your Bank Account"
              desc="In order to request a payout, please connect your bank account."
              action={
                <Button
                  onClick={() => setStep(2)}
                  className="w-fit bg-accent text-white hover:bg-accent"
                >
                  Connect Bank Account
                </Button>
              }
            />
          </div>
        )}

        {step === 2 && (
          <>
            {isLoading ? (
              <Loader className="h-full" />
            ) : (
              <DialogHeader>
                <DialogTitle className="font-body capitalize">
                  Connect Your Bank Account
                </DialogTitle>
                <p className="font-body text-[0.8rem] text-body-1">
                  Please enter your bank account details below to receive
                  payouts.
                </p>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col"
                  >
                    <div className="mt-4 grid w-full grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="bank"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel required>Select bank</FormLabel>
                            <Popover
                              modal={true}
                              open={bankPopoverOpen}
                              onOpenChange={setBankPopoveropen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="input"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? banks?.data.find(
                                          (bank) =>
                                            `${bank?.code},${bank?.name}` ===
                                            field.value
                                        )?.name
                                      : "--Select--"}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search bank..." />
                                  <CommandEmpty>No bank found.</CommandEmpty>
                                  <CommandGroup className="max-h-[30vh] overflow-y-scroll">
                                    {banks?.data?.map((bank) => (
                                      <CommandItem
                                        value={`${bank?.code},${bank?.name}`}
                                        key={bank.code}
                                        onSelect={() => {
                                          form.setValue(
                                            "bank",
                                            `${bank?.code},${bank?.name}`
                                          );
                                          setBankPopoveropen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            `${bank?.code},${bank?.name}` ===
                                              field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {bank.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel required>Account number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1234567890"
                                disabled={verifying}
                                type="number"
                                inputMode="numeric"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            {verifiedName && (
                              <span className="font-body text-[.75rem] uppercase text-accent">
                                {verifiedName}
                              </span>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="secondary"
                      className="ml-auto mt-10 w-fit"
                      disabled={!verified}
                      loading={saving}
                    >
                      Connect Bank Account
                    </Button>
                  </form>
                </Form>
              </DialogHeader>
            )}
          </>
        )}
      </div>
    </DialogContent>
  );
};

export default ConnectBankAccountDialog;
