"use server";

import { categories } from "@/lib/catalog";
import { INQUIRY_TYPES } from "@/lib/inquiry";
import { isSpam, validate, type FormState } from "@/lib/validation";

/*
 * Inquiry endpoint for quotation, sample, partnership and general requests.
 * Input is validated on the server, then handed to `deliverInquiry`. Connect
 * that function to your email provider (e.g. Resend, SES), CRM or database.
 */

async function deliverInquiry(data: Record<string, string>) {
  // Replace with a real integration. Avoid logging personal data in production.
  console.info("[inquiry]", JSON.stringify({ type: data.inquiryType, category: data.category, country: data.country }));
}

export async function submitInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Thank you — our team will be in touch shortly.", errors: {} };

  const { values, errors, ok } = validate(formData, {
    inquiryType: { required: true, oneOf: INQUIRY_TYPES, label: "Inquiry type" },
    name: { required: true, min: 2, max: 80, label: "Full name" },
    company: { required: true, min: 2, max: 120, label: "Company" },
    email: { required: true, email: true, max: 120, label: "Business email" },
    phone: { phone: true, label: "Phone / WhatsApp" },
    country: { required: true, max: 60, label: "Country" },
    category: { oneOf: ["", ...categories.map((c) => c.slug)], label: "Product category" },
    quantity: { max: 60, label: "Estimated quantity" },
    message: { required: true, min: 15, max: 3000, label: "Message" },
    consent: { required: true, label: "Consent" },
  });

  if (!ok) {
    return { status: "error", message: "Please review the highlighted fields and try again.", errors, values };
  }

  await deliverInquiry(values);

  const firstName = values.name.split(" ")[0];
  const what =
    values.inquiryType === "quotation"
      ? "quotation request"
      : values.inquiryType === "sample"
        ? "sample request"
        : values.inquiryType === "partnership"
          ? "partnership inquiry"
          : "message";
  return {
    status: "success",
    message: `Thank you, ${firstName}. We have received your ${what} and will reply to ${values.email} within one business day.`,
    errors: {},
  };
}
