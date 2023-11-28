export type TStep = "role" | "register";

export type TRole = "USER" | "ADMIN";

export type TFormValue = {
  step: TStep;
  role: TRole;
  email: string;
  password: string;
  nickname: string;
};
