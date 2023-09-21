import * as React from "react";

import { cn } from "@lib/cn";
import { VariantProps, cva } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";

const InputVariants = cva("relative", {
  variants: {
    iconPosition: {
      left: " absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground",
      right:
        " absolute left-auto right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground",
    },
  },
  defaultVariants: {
    iconPosition: "right",
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {
  icon?: JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconPosition, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <>
        {icon || type === "password" ? (
          <div className="relative block h-10">
            {iconPosition !== "right" && (
              <span className={cn(InputVariants({ iconPosition }))}>
                {icon}
              </span>
            )}
            <input
              type={showPassword ? "text" : type}
              className={cn(
                "flex h-10 w-full rounded-md border-[.5px] border-[#C4C4C4] bg-grey px-3 py-2 font-body text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-body placeholder:text-[.8rem] placeholder:font-[300] placeholder:text-body-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-[#C4C4C4] disabled:opacity-50",
                className,
                iconPosition !== "right" && icon ? "pl-10 pr-4" : "pr-10"
              )}
              ref={ref}
              {...props}
            />
            {iconPosition === "right" && (
              <span className={cn(InputVariants({ iconPosition }))}>
                {icon}
              </span>
            )}
            {type === "password" && (
              <span className={cn(InputVariants({ iconPosition: "right" }))}>
                {showPassword ? (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    size={16}
                  />
                ) : (
                  <EyeOff
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    size={16}
                  />
                )}
              </span>
            )}
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-transparent px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
