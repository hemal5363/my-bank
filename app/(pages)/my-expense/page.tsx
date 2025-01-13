"use client";

import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddEditAccount from "@/components/shared/AddEditAccount";
import AccountHistoryTable from "@/components/shared/AccountHistoryTable";
import DateRangePicker from "@/components/shared/DateRangePicker";
import { getAllAccount } from "@/services/accountService";
import { getAllAccountHistoryByExpenseAccountId } from "@/services/accountHistoryService";
import {
  getAllExpenseType,
  getFilterExpenseType,
} from "@/services/expenseTypeService";
import { hideLoader, showLoader } from "@/utils/helper";
import { IAccount, IAccountHistory, IExpenseType } from "@/types";
import { ACCOUNT_TYPES } from "@/constants";
import * as configJSON from "@/constants/configJson";

const page = () => {
  const [allAccounts, setAllAccounts] = useState<IAccount[]>([]);
  const [allAccountsHistory, setAllAccountsHistory] = useState<
    IAccountHistory[]
  >([]);
  const [expenseData, setExpenseData] = useState<IAccount>();
  const [totalExpense, setTotalExpense] = useState(0);
  const [dateRange, setDate] = useState<DateRange | undefined>();
  const [expenseTypeId, setExpenseTypeId] = useState<string | undefined>();
  const [allExpenseType, setAllExpenseType] = useState<IExpenseType[]>([]);
  const [filterExpenseType, setFilterExpenseType] = useState<IExpenseType[]>(
    []
  );

  useEffect(() => {
    getReloadAPICall();
    (async () => {
      const expenseTypeData = await getAllExpenseType();
      setAllExpenseType(expenseTypeData);
    })();
  }, []);

  useEffect(() => {
    if (expenseData?._id) {
      (async () => {
        const expenseTypeData = await getFilterExpenseType(expenseData?._id);
        setFilterExpenseType(expenseTypeData);
      })();
    }
  }, [expenseData?._id]);

  const getAccountHistoryAPICall = async (
    date?: DateRange | undefined,
    eTypeId?: string
  ) => {
    setDate(date);
    setExpenseTypeId(eTypeId);
    const {
      data: accountHistoryData,
      account,
      totalAmount,
      expenseTypes,
    } = await getAllAccountHistoryByExpenseAccountId(
      date?.from,
      date?.to,
      eTypeId
    );
    setExpenseData(account);
    setAllAccountsHistory(
      accountHistoryData.map((accountHistory) => ({
        ...accountHistory,
        _expenseType: expenseTypes.find(
          (expenseType: IExpenseType) =>
            expenseType._id === accountHistory._expenseType
        ) as IExpenseType,
      }))
    );
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
        <h1 className="text-xl font-bold">{configJSON.myExpense}</h1>
        <AddEditAccount
          buttonName={configJSON.addAmount}
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
          buttonName={configJSON.addAmount}
          isAddAmount
          isExpenseDebit
          doReload={getAccountHistoryAPICall}
          openId={expenseData?._id}
          accountList={allAccounts}
          allExpenseType={allExpenseType}
        />
      </div>
      <div className="my-5 sm:flex sm:flex-wrap grid items-center gap-5">
        <DateRangePicker
          placeholder="Select date range"
          onChange={(date) => getAccountHistoryAPICall(date, expenseTypeId)}
          date={dateRange}
        />
        <Select onValueChange={(v) => getAccountHistoryAPICall(dateRange, v)}>
          <SelectTrigger className="col-span-3 w-52">
            <SelectValue placeholder="Select expense type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filterExpenseType?.map((list) => (
                <SelectItem value={list._id} key={list._id}>
                  {list.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {totalExpense ? (
          <div className="text-destructive">
            {configJSON.totalExpense} : {totalExpense}
          </div>
        ) : (
          <></>
        )}
      </div>
      <AccountHistoryTable allAccountsHistory={allAccountsHistory} />
    </div>
  );
};

export default page;
