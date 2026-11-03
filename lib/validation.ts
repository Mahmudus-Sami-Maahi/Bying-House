/* Small dependency-free validation helpers shared by the server actions. */

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Record<string, string>;
  /** Echo of submitted values so inputs keep their content after a failed submit. */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle", message: "", errors: {} };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s.-]{7,20}$/;

type Rule = {
  required?: boolean;
  max?: number;
  min?: number;
  email?: boolean;
  phone?: boolean;
  oneOf?: readonly string[];
  date?: "future";
  label: string;
};

export function validate(formData: FormData, rules: Record<string, Rule>) {
  const values: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const [field, rule] of Object.entries(rules)) {
    const raw = formData.get(field);
    const value = typeof raw === "string" ? raw.trim() : "";
    values[field] = value;

    if (!value) {
      if (rule.required) errors[field] = `${rule.label} is required.`;
      continue;
    }
    if (rule.min && value.length < rule.min) errors[field] = `${rule.label} must be at least ${rule.min} characters.`;
    else if (rule.max && value.length > rule.max) errors[field] = `${rule.label} must be under ${rule.max} characters.`;
    else if (rule.email && !EMAIL.test(value)) errors[field] = "Enter a valid email address.";
    else if (rule.phone && !PHONE.test(value)) errors[field] = "Enter a valid phone number.";
    else if (rule.oneOf && !rule.oneOf.includes(value)) errors[field] = `Choose a valid ${rule.label.toLowerCase()}.`;
    else if (rule.date === "future") {
      const day = new Date(`${value}T23:59:59`);
      if (Number.isNaN(day.getTime())) errors[field] = "Enter a valid date.";
      else if (day.getTime() < Date.now()) errors[field] = "Choose a date in the future.";
    }
  }

  return { values, errors, ok: Object.keys(errors).length === 0 };
}

/** Bots fill hidden fields; humans never see this one. */
export function isSpam(formData: FormData) {
  const trap = formData.get("company_website");
  return typeof trap === "string" && trap.length > 0;
}
