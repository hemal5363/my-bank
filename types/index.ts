export interface IAccount {
  _id: string;
  name: string;
  amount: number;
}

export interface IAccountHistory {
  id: string;
  amount: number;
  newAmount: number;
  isCredited: boolean;
}
