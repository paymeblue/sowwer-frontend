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
import { FixedSizeList as List } from "react-window";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import Loader from "@components/shared/Loader";

const FList = List as any;

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ConnectBankAccountDialog = ({ setOpen }: Props) => {
  const { toast } = useToast();
  const [verified, setVerified] = useState(false);
  const [verifiedName, setVerifiedName] = useState<null | string>(null);
  const [reference, setReference] = useState<null | string>(null);
  const { data: banks, isLoading } = useGetBanksQuery();
  const [verifyAccount, { isLoading: verifying }] = useVerifyAccountMutation();
  const [saveAccount, { isLoading: saving }] = useSaveAccountMutation();
  const [step, setStep] = useState(1);
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
    <DialogContent className="h-[40vh]">
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
                //   loading={deleteLoading}
                //   onClick={handleDelete}
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
                Please enter your bank account details below to receive payouts.
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
                        <FormItem>
                          <FormLabel required>Select bank</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                className="bg-[#F2F2F2]"
                                disabled={verifying}
                              >
                                <SelectValue placeholder="--Select--">
                                  <span className="!text-start text-[.75rem] text-body-2">
                                    {form.watch("bank")?.split(",")[1]}
                                  </span>
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[30vh]">
                              <FList
                                height={200}
                                itemCount={banks?.data.length}
                                itemSize={40}
                                width="100%"
                              >
                                {({ index, style }: any) => {
                                  const option = banks?.data[index];
                                  const key = `${index}-${option?.code}`;
                                  return (
                                    <div key={key} style={style}>
                                      <SelectItem
                                        key={key}
                                        value={`${option?.code},${option?.name}`}
                                        className="text-[.75rem] text-body-2"
                                      >
                                        {option?.name}
                                      </SelectItem>
                                    </div>
                                  );
                                }}
                              </FList>
                            </SelectContent>
                          </Select>
                          <FormMessage />
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
    </DialogContent>
  );
};

export default ConnectBankAccountDialog;
