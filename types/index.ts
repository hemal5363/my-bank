export interface IAccount {
  _id: string;
  name: string;
  amount: number;
}

export interface IAccountHistory {
  _id: string;
  amount: number;
  newAmount: number;
  isCredited: boolean;
  _account: string;
}
