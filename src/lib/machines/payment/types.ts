export type PaymentFormEventTypes =
  | "SUBMIT"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_FAILED";

export type PaymentFormEvents = {
  type: PaymentFormEventTypes;
  data?: Record<string, unknown>;
};

export type PaymentFormContext = {
  message: string;
};
