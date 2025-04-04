import { cn } from "@lib/cn";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, Fragment } from "react";
import { Button } from "./button";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loadingText: string;
  className?: string;
  loading: boolean;
  disabled?: boolean;
  size?: "default" | "icon" | "lg" | "sm" | null;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
}
const FormButton = ({
  text,
  loadingText,
  className,
  loading,
  disabled,
  variant,
  size,
  ...props
}: FormButtonProps) => {
  return (
    <Button
      aria-disabled={loading}
      disabled={loading || disabled}
      className={cn(
        "font-montreal text-sm font-medium text-black disabled:cursor-not-allowed",
        className
      )}
      type="submit"
      size={size}
      variant={variant}
      {...props}
    >
      {loading ? (
        <Fragment>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </Fragment>
      ) : (
        text
      )}
    </Button>
  );
};

export default FormButton;
