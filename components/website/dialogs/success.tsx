"use client";

import { Button } from "@components/ui/button";
import { Dialog, DialogContent } from "@components/ui/dialog";
import Image from "next/image";
import success from "public/images/success.png";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type Data = {
  title: string;
  desc: string | ReactNode;
};
type Props = Data & {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
};

const Success = ({ open, title, desc, setOpen, setOpenLoginModal }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-3xl">
        <Image
          src={success}
          alt="success icon"
          width={60}
          height={60}
          className="mx-auto"
        />
        <div className="space-y-3">
          <h4 className="text-center font-aeonik text-[1.75rem] font-medium text-black">
            {title}
          </h4>
          <p className="text-center font-montreal text-base leading-[1.3125rem] text-body-2">
            {desc}
          </p>
        </div>
        <Button
          onClick={() => {
            setOpenLoginModal(true);
            setOpen(false);
          }}
          className="w-full font-montreal text-sm font-medium text-black"
        >
          Go to login
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Success;
