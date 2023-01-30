import type { PaymentFormContext, PaymentFormEvents } from "./types";

export const isFormValid = (
  _: PaymentFormContext,
  event: PaymentFormEvents
) => {
  return event.data?.name !== "" && event.data?.card !== "";
};
