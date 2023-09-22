import { cn } from "@lib/cn";
import { Loader2 } from "lucide-react";
import { HTMLAttributes } from "react";

interface Props {
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const Loader = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-[100vh] w-full items-center justify-center text-accent",
        className
      )}
    >
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loader;
