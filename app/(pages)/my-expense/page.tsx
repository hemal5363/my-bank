"use client";

import AddEditAccount from "@/components/shared/AddEditAccount";
import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "@/utils/helper";
import { IAccount, IAccountHistory } from "@/types";
import { getExpenseAccount } from "@/services/expenseAccountService";
import { getAllAccount } from "@/services/accountService";
import AccountHistoryTable from "@/components/shared/AccountHistoryTable";
import { getAllAccountHistoryByAccountId } from "@/services/accountHistoryService";

const page = () => {
  const [allAccounts, setAllAccounts] = useState<IAccount[]>([]);
  const [allAccountsHistory, setAllAccountsHistory] = useState<
    IAccountHistory[]
  >([]);
  const [expenseData, setExpenseData] = useState<IAccount>();
  const [isReload, setReload] = useState(false);

  useEffect(() => {
    callGetAPI();
  }, [isReload]);

  const callGetAPI = async () => {
    showLoader();
    const data = await getExpenseAccount();
    const { data: accountData } = await getAllAccount();
    const {
      data: { data: accountHistoryData },
    } = await getAllAccountHistoryByAccountId(data._id);
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
      <AccountHistoryTable allAccountsHistory={allAccountsHistory} />
    </div>
  );
};

export default page;
