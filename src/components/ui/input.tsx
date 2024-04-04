import * as React from "react";

import { cn } from "@ktm/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-slate-200  focus-visible:ring-slate-950  dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 flex h-10 rounded-md  border px-3 py-2 text-sm ring-offset-white file:border-0 file:text-sm file:font-medium focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
