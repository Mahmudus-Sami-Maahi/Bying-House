"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { submitInquiry } from "@/app/actions";
import { INQUIRY_TYPES, inquiryLabels, type InquiryType } from "@/lib/inquiry";
import { initialFormState, type FormState } from "@/lib/validation";
import { button } from "../ui";
import { Field, FormMessage, FormSuccess, Honeypot } from "./fields";

interface Props {
  categories: { slug: string; name: string }[];
}

const asType = (v: string | null | undefined): InquiryType =>
  INQUIRY_TYPES.includes(v as InquiryType) ? (v as InquiryType) : "quotation";

/** Professional B2B inquiry form. `?type=` and `?category=` preselect options. */
export function InquiryForm({ categories }: Props) {
  const params = useSearchParams();
  const [state, action, pending] = useActionState(submitInquiry, initialFormState);
  const [type, setType] = useState<InquiryType>(() => asType(params.get("type")));
  const [dismissed, setDismissed] = useState<FormState | null>(null);
  const presetCategory = categories.some((c) => c.slug === params.get("category")) ? params.get("category")! : "";

  if (state.status === "success" && state !== dismissed) {
    return <FormSuccess message={state.message} onReset={() => setDismissed(state)} />;
  }

  const copy = inquiryLabels[type];

  return (
    <form action={action} noValidate className="relative space-y-6">
      <Honeypot />
      <fieldset>
        <legend className="mb-3 block text-[0.8125rem] font-medium text-ink-soft">What can we help you with?</legend>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {INQUIRY_TYPES.map((t) => {
            const on = type === t;
            return (
              <label
                key={t}
                className={`relative flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-center text-[0.8125rem] font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                  on ? "border-ink text-white" : "border-line text-ink-soft hover:border-ink/40"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="inquiry-type"
                    className="absolute inset-0 rounded-[0.65rem] bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <input
                  type="radio"
                  name="inquiryType"
                  value={t}
                  checked={on}
                  onChange={() => setType(t)}
                  className="sr-only"
                />
                <span className="relative">{inquiryLabels[t].tab}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Full name" state={state}>
          {(p) => <input type="text" autoComplete="name" required {...p} />}
        </Field>
        <Field name="company" label="Company / brand" state={state}>
          {(p) => <input type="text" autoComplete="organization" required {...p} />}
        </Field>
        <Field name="email" label="Business email" state={state}>
          {(p) => <input type="email" autoComplete="email" required {...p} />}
        </Field>
        <Field name="phone" label="Phone / WhatsApp" state={state} optional>
          {(p) => <input type="tel" autoComplete="tel" {...p} />}
        </Field>
        <Field name="country" label="Country" state={state}>
          {(p) => <input type="text" autoComplete="country-name" required {...p} />}
        </Field>
        <Field name="category" label="Product category" state={state} optional defaultValue={presetCategory}>
          {(p) => (
            <select {...p}>
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </Field>
        {type !== "general" && (
          <Field
            name="quantity"
            label={type === "partnership" ? "Estimated annual volume" : "Estimated quantity"}
            state={state}
            optional
            className="sm:col-span-2"
          >
            {(p) => (
              <input
                type="text"
                placeholder={type === "partnership" ? "e.g. 200,000 pcs / year" : "e.g. 3,000 pcs across 2 colours"}
                {...p}
              />
            )}
          </Field>
        )}
      </div>

      <Field name="message" label="Project details" state={state} hint={copy.prompt}>
        {(p) => <textarea rows={6} required {...p} />}
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm leading-6 text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            defaultChecked={state.values?.consent === "yes"}
            aria-invalid={state.errors.consent ? true : undefined}
            aria-describedby={state.errors.consent ? "consent-error" : undefined}
            className="mt-1 size-4 accent-gold"
          />
          I agree that MetaMax Fashions may store and use these details to respond to my inquiry.
        </label>
        {state.errors.consent && (
          <p id="consent-error" className="mt-1.5 text-xs font-medium text-danger">
            Please confirm so we can respond to your inquiry.
          </p>
        )}
      </div>

      <FormMessage state={state} />
      <button type="submit" disabled={pending} className={button("primary", "lg", "w-full sm:w-auto")}>
        {pending ? "Sending…" : copy.title}
        {!pending && <ArrowUpRight className="size-4" aria-hidden="true" />}
      </button>
    </form>
  );
}
