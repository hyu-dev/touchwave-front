import { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

export type TSwal = (args: Omit<TSwalTemplate, "icon">) => void;

export type TSwalTemplate = {
  icon?: "success" | "error" | "warning" | "question";
  text?: string;
  html?: string;
  action?: TAlertAction;
  failed?: TAlertAction;
  input?: "email" | "text";
} & SweetAlertOptions;

export type TAlertAction = <T = any>(value: SweetAlertResult<T>) => void;
