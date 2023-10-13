"use client";
import EmptyState from "@components/shared/EmptyState";
import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <EmptyState
        image={
          <div className="relative aspect-[1/0.9] w-[10rem] lg:aspect-[1/0.7] lg:w-[20rem]">
            <Image
              src="/assets/images/page-not-found.png"
              alt="Page not found image"
              fill
              className="object-contain"
            />
          </div>
        }
        title="Did you get lost?"
        desc="Sorry, the page you visited does not exist."
        action={
          <Link href="/">
            <Button className="w-fit">Back to home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default PageNotFound;
