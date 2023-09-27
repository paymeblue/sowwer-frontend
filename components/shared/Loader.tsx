import { cn } from "@lib/cn";
import { Loader2 } from "lucide-react";
import { HTMLAttributes } from "react";
import Logo from "./Logo";

interface Props {
  className?: HTMLAttributes<HTMLDivElement>["className"];
  showLogo?: boolean;
}

const Loader = ({ className, showLogo = false }: Props) => {
  return (
    <div
      className={cn(
        "flex h-[100vh] w-full flex-col items-center justify-center space-x-2 text-accent",
        className
      )}
    >
      {showLogo && <Logo className="w-[9rem]" />}
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loader;
