"use client";

import AddEditAccount from "@/components/shared/AddEditAccount";
import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "@/utils/helper";
import { IAccount, IAccountHistory, IExpenseType } from "@/types";
import { getAllAccount } from "@/services/accountService";
import AccountHistoryTable from "@/components/shared/AccountHistoryTable";
import { getAllAccountHistoryByAccountId } from "@/services/accountHistoryService";
import DateRangePicker from "@/components/shared/DateRangePicker";
import { DateRange } from "react-day-picker";
import { ACCOUNT_TYPES } from "@/constants";
import { getAllExpenseType } from "@/services/expenseTypeService";

const page = ({ params }: { params: { expenseId: string } }) => {
  const [allAccounts, setAllAccounts] = useState<IAccount[]>([]);
  const [allAccountsHistory, setAllAccountsHistory] = useState<
    IAccountHistory[]
  >([]);
  const [expenseData, setExpenseData] = useState<IAccount>();
  const [totalExpense, setTotalExpense] = useState(0);
  const [dateRange, setDate] = useState<DateRange | undefined>();
  const [allExpenseType, setAllExpenseType] = useState<IExpenseType[]>([]);

  useEffect(() => {
    getReloadAPICall();
    (async () => {
      const { data: expenseTypeData } = await getAllExpenseType();
      setAllExpenseType(expenseTypeData);
    })();
  }, []);

  const getAccountHistoryAPICall = async (date?: DateRange | undefined) => {
    setDate(date);
    const {
      data: accountHistoryData,
      account,
      totalAmount,
    } = await getAllAccountHistoryByAccountId(
      params.expenseId,
      date?.from,
      date?.to
    );
    setExpenseData(account);
    setAllAccountsHistory(accountHistoryData);
    setTotalExpense(totalAmount);
  };

  const getReloadAPICall = async () => {
    showLoader();
    await getAccountHistoryAPICall();
    const { data: accountData } = await getAllAccount(ACCOUNT_TYPES.Account);
    setAllAccounts(accountData);
    hideLoader();
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6">
      <div className="flex sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">My Expense</h1>
        <AddEditAccount
          buttonName="Add Amount"
          isExpense
          doReload={getReloadAPICall}
          openId={expenseData?._id}
          accountList={allAccounts}
          allExpenseType={allExpenseType}
        />
      </div>
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">{expenseData?.amount}</h1>
        <AddEditAccount
          buttonName="Add Amount"
          isAddAmount
          isExpenseDebit
          doReload={getAccountHistoryAPICall}
          openId={expenseData?._id}
          accountList={allAccounts}
          allExpenseType={allExpenseType}
        />
      </div>
      <div className="my-5 sm:flex grid items-center gap-5">
        <DateRangePicker
          placeholder="Select date range"
          onChange={getAccountHistoryAPICall}
          date={dateRange}
        />
        {totalExpense ? (
          <div className="text-destructive">Total Expense : {totalExpense}</div>
        ) : (
          <></>
        )}
      </div>
      <AccountHistoryTable allAccountsHistory={allAccountsHistory} />
    </div>
  );
};

export default page;
