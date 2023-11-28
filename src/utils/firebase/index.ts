import * as api from "./api";
import { errors } from "./errors";
import * as init from "./init";

export const fb = { errors, api, ...init };
