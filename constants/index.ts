import * as configJSON from "@/constants/configJson";

export const URL_CONSTANTS = {
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/",
  PROFILE: "/profile",
  RESET_PASSWORD: "/reset-password",
  ACCOUNT: "/my-accounts",
  ACCOUNT_HISTORY: "/my-account-history",
};

export const HEADER_LINKS = [
  {
    id: "1",
    title: configJSON.myAccount,
    href: `${URL_CONSTANTS.ACCOUNT}?isDue=false`,
  },
  {
    id: "2",
    title: "My Expense",
    href: "/my-expense",
  },
  {
    id: "3",
    title: configJSON.myDue,
    href: `${URL_CONSTANTS.ACCOUNT}?isDue=true`,
  },
  {
    id: "4",
    title: "Expense Type",
    href: "/expense-type",
  },
  {
    id: "5",
    title: configJSON.profileSetting,
    href: URL_CONSTANTS.PROFILE,
  },
  {
    id: "6",
    title: configJSON.resetPassword,
    href: URL_CONSTANTS.RESET_PASSWORD,
  },
];

export const SHOW_WEB_HEADER = 4;

export const ACCOUNT_TYPES = {
  Account: 1,
  Expense: 2,
  Due: 3,
};

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const NEXT_RESPONSE_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const LOCAL_STORAGE_CONSTANTS = {
  TOKEN: "token",
  USER_DATA: "userData",
};
