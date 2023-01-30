import { assign, createMachine } from "xstate";

import { fakePayment } from "./effects";
import { isFormValid } from "./guards";

import type { PaymentFormContext, PaymentFormEvents } from "./types";

export const paymentMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAcCGBPAtmAdgFwDEB7AJ0wDoBLCAGzAGIBlAVQCEBZASQBUBtABgC6iFEViU8lIjhEgAHogDMAJgAs5AGyqAnAHZlGgBwbdJgKyGANCHSJly7eQCMTh8sU6N2-mf0BfP2s0LFxCUgoaIlQIShwoegAFAEEATXYAUQA5bgB9ACV0gGF0zgA1dIARAWEkEGQxCSkZWoUEVUUNch1lJ301Vyd+bVVrWwQnDy7VZV1+FVVZ2cUAoIxsfGIyckjo2PjktKzcgiTOABlK6tl68UlpWVblQ0NybW0e3W1DWY0fBdHEC9FNozPw5oonKp+O5tE4VnU1qFNhQwCQSKQmGwuHwhNcGndmqBWoZ+F1DE8nL8NNTVO1lADxrTnLoFqovA5nhongFAiAcEQIHBroiNuE8bcmg9EABaEHkMyKQx6HRmZQ+DROBnSz7kfiGVSUqFmMzTXSmeHBdZhLbUOjixr3Foypka3x6dwOYHPBn2RxDN7Q6FmpW+C0i60RKIxOL2glShAqF56WFmLTDSH8DQMibqd7aIy9M0gg1hkKirao9EkWOSp0IaULeWK5UgtWpoYjGyApxdamQgwmg0h0tW5HkWAAVwAxlO4PBajcHYT5IgNKryGryeSFvwlpqu+NFIpNMYnCmLIZFJ8eX4gA */
  createMachine<PaymentFormContext, PaymentFormEvents>({
    id: "paymentForm",
    initial: "idle",
    predictableActionArguments: true,
    context: {
      message: "",
    },
    states: {
      idle: {
        on: {
          SUBMIT: [
            {
              target: "loading",
              cond: isFormValid,
            },
            {
              target: "error",
            },
          ],
        },
      },
      loading: {
        invoke: {
          id: "submitPayment",
          src: () => fakePayment(),
          onDone: {
            target: "success",
            actions: assign({ message: (_, event) => event.data }),
          },
          onError: {
            target: "error",
            actions: assign({ message: (_, event) => event.data }),
          },
        },
      },
      error: {
        on: {
          SUBMIT: {
            target: "loading",
            cond: isFormValid,
          },
        },
      },
      success: {
        type: "final",
      },
    },
  });
