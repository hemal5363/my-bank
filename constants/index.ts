export const HEADER_LINKS = [
  {
    id: "1",
    title: "My Accounts",
    href: "/my-accounts",
  },
  {
    id: "2",
    title: "My Expense",
    href: "/my-expense",
  },
  {
    id: "3",
    title: "My Due",
    href: "/my-due",
  },
  {
    id: "4",
    title: "Expense Type",
    href: "/expense-type",
  },
  {
    id: "5",
    title: "Profile Setting",
    href: "/profile",
  },
  {
    id: "6",
    title: "Reset Password",
    href: "/reset-password",
  },
];

export const ACCOUNT_TYPES = {
  Account: 1,
  Expense: 2,
  Due: 3,
};

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
