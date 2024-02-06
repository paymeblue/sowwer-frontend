// TODO: delete after backend integrating
export let IS_AUTHENTICATED = false;

export const setMockAuthetnication = (val: boolean) => {
  IS_AUTHENTICATED = val;
};

/* eslint-disable */
export enum Status {
  active = "active",
  drafted = "drafted",
  completed = "completed",
}
/* eslint-enable */

export const PAYMENT_GATEWAY: "paystack" | "flutterwave" = "paystack";
