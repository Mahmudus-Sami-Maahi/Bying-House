import { Check } from "lucide-react";
import type { FormState } from "@/lib/validation";
import { label as labelClass } from "../ui";

interface FieldProps {
  name: string;
  label: string;
  state: FormState;
  id?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  defaultValue?: string;
  children: (props: {
    id: string;
    name: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    defaultValue: string | undefined;
    className: string;
  }) => React.ReactNode;
}

/** Label + control + error wiring with correct ARIA relationships. */
export function Field({ name, label, state, id, hint, optional, className = "", defaultValue, children }: FieldProps) {
  const fieldId = id ?? `f-${name}`;
  const error = state.errors[name];
  const describedBy = [hint && `${fieldId}-hint`, error && `${fieldId}-error`].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className={labelClass}>
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children({
        id: fieldId,
        name,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        defaultValue: state.values?.[name] ?? defaultValue,
        className: "field",
      })}
      {hint && !error && (
        <p id={`${fieldId}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${fieldId}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Off-screen trap field for naive bots. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormMessage({ state }: { state: FormState }) {
  return (
    <div aria-live="polite" role="status">
      {state.status === "error" && (
        <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
          {state.message}
        </p>
      )}
    </div>
  );
}

export function FormSuccess({
  message,
  onReset,
  resetLabel = "Send another inquiry",
}: {
  message: string;
  onReset?: () => void;
  resetLabel?: string;
}) {
  return (
    <div role="status" className="flex flex-col items-center rounded-2xl bg-gold-soft px-6 py-14 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-gold text-white">
        <Check className="size-7" aria-hidden="true" />
      </span>
      <p className="mt-6 max-w-md font-display text-2xl leading-snug text-ink">{message}</p>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-6 text-sm font-semibold text-gold hover:underline">
          {resetLabel}
        </button>
      )}
    </div>
  );
}
