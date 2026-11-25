import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const base = "w-full bg-transparent border-0 border-b-2 border-navy/20 px-0 py-3 text-[16px] text-ink placeholder:text-ink/40 focus:border-orange focus:outline-none transition-colors aria-[invalid=true]:border-red-600";

type FieldProps = { label: string; error?: string; hint?: string; children: React.ReactNode; id: string; required?: boolean; dark?: boolean };
export function Field({ label, error, children, id, required, dark }: FieldProps) {
  return (
    <div className={cn("flex flex-col", dark && "text-white")}>
      <label htmlFor={id} className="eyebrow mb-1 text-[11px] opacity-70">{label}{required && <span aria-hidden className="text-orange"> *</span>}</label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...p }, ref) => <input ref={ref} className={cn(base, className)} {...p} />);
Input.displayName = "Input";
export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...p }, ref) => <textarea ref={ref} className={cn(base, "resize-none", className)} {...p} />);
Textarea.displayName = "Textarea";
export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ className, ...p }, ref) => <select ref={ref} className={cn(base, "appearance-none cursor-pointer", className)} {...p} />);
Select.displayName = "Select";
