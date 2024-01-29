"use client";

import AddEditAccount from "@/components/shared/AddEditAccount";
import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "@/utils/helper";
import { IAccount, IAccountHistory } from "@/types";
import { getAllAccount, getExpenseAccount } from "@/services/accountService";
import AccountHistoryTable from "@/components/shared/AccountHistoryTable";
import { getAllAccountHistoryByAccountId } from "@/services/accountHistoryService";
import DateRangePicker from "@/components/shared/DateRangePicker";
import { DateRange } from "react-day-picker";

const page = () => {
  const [allAccounts, setAllAccounts] = useState<IAccount[]>([]);
  const [allAccountsHistory, setAllAccountsHistory] = useState<
    IAccountHistory[]
  >([]);
  const [filterAccountsHistory, setFilterAccountsHistory] = useState<
    IAccountHistory[]
  >([]);
  const [expenseData, setExpenseData] = useState<IAccount>();
  const [totalExpense, setTotalExpense] = useState(0);
  const [isReload, setReload] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>();

  useEffect(() => {
    callGetAPI();
  }, [isReload]);

  useEffect(() => {
    if (dateRange) {
      let accountHistory: IAccountHistory[] = [];
      if (dateRange.from) {
        accountHistory = allAccountsHistory.filter(
          (history) =>
            new Date(history.createdAt) > new Date(dateRange.from as Date)
        );
      }
      if (dateRange.to) {
        accountHistory = accountHistory.filter(
          (history) =>
            new Date(history.createdAt) <= new Date(dateRange.to as Date)
        );
      }

      let total = 0;
      accountHistory
        .filter((account) => !account.isCredited)
        .forEach((account: any) => {
          total = total + account.amount;
        });
      setTotalExpense(total);
      setFilterAccountsHistory(accountHistory);
    } else {
      setFilterAccountsHistory(allAccountsHistory);
      setTotalExpense(0);
    }
  }, [dateRange, allAccountsHistory]);

  const callGetAPI = async () => {
    showLoader();
    const data = await getExpenseAccount();
    const { data: accountData } = await getAllAccount();
    const { data: accountHistoryData } = await getAllAccountHistoryByAccountId(
      data._id
    );
    setExpenseData(data);
    setAllAccounts(accountData);
    setAllAccountsHistory(accountHistoryData);
    hideLoader();
  };

  const doReload = () => {
    setReload(!isReload);
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6">
      <div className="flex sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">My Expense</h1>
        <AddEditAccount
          buttonName="Add Amount"
          isExpense
          doReload={doReload}
          openId={expenseData?._id}
          accountList={allAccounts}
        />
      </div>
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">{expenseData?.amount}</h1>
        <AddEditAccount
          buttonName="Add Amount"
          isAddAmount
          isExpenseDebit
          doReload={doReload}
          openId={expenseData?._id}
          accountList={allAccounts}
        />
      </div>
      <div className="my-5 sm:flex grid items-center gap-5">
        <DateRangePicker
          placeholder="Select date range"
          onChange={setDateRange}
        />
        {totalExpense ? (
          <div className="text-destructive">Total Expense : {totalExpense}</div>
        ) : (
          <></>
        )}
      </div>
      <AccountHistoryTable allAccountsHistory={filterAccountsHistory} />
    </div>
  );
};

export default page;
