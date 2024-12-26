export interface IAccount {
  _id: string;
  name: string;
  amount: number;
  history?: IAccountHistory;
}

export interface IAccountHistory {
  _id: string;
  amount: number;
  newAmount: number;
  isCredited: boolean;
  _account: string;
  _expenseType: IExpenseType;
  createdAt: Date;
}

export interface IExpenseType {
  _id: string;
  name: string;
}

export interface IUserAccount {
  _id: string;
  name: string;
  email: string;
}

export interface ITokenData {
  email: string;
  _id: string;
  expenseAccountId: string;
}

export interface IPostRequestUserAccount {
  name: string;
  email: string;
  password: string;
}

export interface IPatchRequestUserAccount {
  oldPassword: string;
  password: string;
}

export interface IPutRequestUserAccount {
  name: string;
}

export interface IPostRequestSignIn {
  email: string;
  password: string;
}

export interface IPostRequestSend {
  email: string;
}

export interface IPostRequestAccount {
  name: string;
  amount: number;
  type: number;
  expenseTypeId: string;
}

export interface IPutRequestAccount {
  amount: number;
  isCredited: boolean;
  expenseTypeId: string;
}

export interface IPostRequestAccountHistory {
  amount: number;
  newAmount: number;
  isCredited: boolean;
  _account: string;
}

export interface IPostAndPutRequestExpenseType {
  name: string;
}
