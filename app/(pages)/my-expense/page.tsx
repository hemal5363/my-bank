"use client";

import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddEditAccount from "@/components/shared/AddEditAccount";
import { getExpenseAccount } from "@/services/accountService";
import DeleteAccount from "@/components/shared/DeleteAccount";
import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "@/utils/helper";
import { IAccount } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  // const [allAccounts, setAllAccounts] = useState<IAccount[]>([]);
  // const [total, setTotal] = useState(0);
  const [expenseData, setExpenseData] = useState<IAccount>();
  const [isReload, setReload] = useState(false);

  useEffect(() => {
    callGetAPI();
  }, [isReload]);

  const callGetAPI = async () => {
    showLoader();
    const data = await getExpenseAccount();
    setExpenseData(data);
    // setAllAccounts(data);
    // setTotal(totalAmount);
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
        />
      </div>
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">{expenseData?.amount}</h1>
        <Button size="icon" variant="outline" className="rounded-xl">
          <Link href={`/my-account-history/${expenseData?._id}`}>
            <PreviewRoundedIcon color="primary" />
          </Link>
        </Button>
      </div>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl">Account Name</TableHead>
            <TableHead className="text-right text-xl">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {allAccounts.map((account) => (
            <TableRow key={account._id}>
              <TableCell className="font-medium">{account.name}</TableCell>
              <TableCell className="text-right">{account.amount}</TableCell>
              <TableCell className="text-right">
                <Button size="icon" variant="outline" className="rounded-xl">
                  <Link href={`/my-accounts/${account._id}`}>
                    <PreviewRoundedIcon color="primary" />
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <AddEditAccount
                  buttonName="Add Amount"
                  isAddAmount
                  doReload={doReload}
                  openId={account._id}
                />
              </TableCell>
              <TableCell className="text-right">
                <DeleteAccount accountId={account._id} doReload={doReload} />
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-base font-bold">Total</TableCell>
            <TableCell className="text-right font-bold text-base">
              {/* {total} */}
            </TableCell>
            <TableCell className="text-base font-bold"></TableCell>
            <TableCell className="text-base font-bold"></TableCell>
            <TableCell className="text-base font-bold"></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default page;
