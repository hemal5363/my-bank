"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import AddEditAccount from "@/components/shared/AddEditAccount";
import DeleteAccount from "@/components/shared/DeleteAccount";
import { getAllAccount } from "@/services/accountService";
import { getAllExpenseType } from "@/services/expenseTypeService";
import { hideLoader, showLoader } from "@/utils/helper";
import { IAccount, IExpenseType } from "@/types";
import { ACCOUNT_TYPES, URL_CONSTANTS } from "@/constants";
import * as configJSON from "@/constants/configJson";

const page = ({ params }: { params: { accountType: string } }) => {
  const [allAccounts, setAllAccounts] = useState<IAccount[]>([]);
  const [total, setTotal] = useState(0);
  const [isReload, setReload] = useState(false);
  const [allExpenseType, setAllExpenseType] = useState<IExpenseType[]>([]);

  const isDue = params.accountType === "due";

  useEffect(() => {
    (async () => {
      const { data: expenseTypeData } = await getAllExpenseType();
      setAllExpenseType(expenseTypeData);
    })();
  }, []);

  useEffect(() => {
    const callGetAPI = async () => {
      showLoader();
      const { data, totalAmount } = await getAllAccount(
        isDue ? ACCOUNT_TYPES.Due : ACCOUNT_TYPES.Account
      );
      setAllAccounts(data);
      setTotal(totalAmount);
      hideLoader();
    };

    callGetAPI();
  }, [isReload, isDue]);

  const doReload = () => {
    setReload(!isReload);
  };

  return (
    <Suspense>
      <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6">
        <div className="flex sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-bold">
            {isDue ? configJSON.myDue : configJSON.myAccount}
          </h1>
          <AddEditAccount
            buttonName={configJSON.add}
            doReload={doReload}
            isDue={isDue}
            allExpenseType={allExpenseType}
          />
        </div>
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl">
                {isDue ? configJSON.dueName : configJSON.accountName}
              </TableHead>
              <TableHead className="text-right text-xl">
                {configJSON.amount}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAccounts.map((account) => (
              <TableRow key={account._id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell className="text-right">{account.amount}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="outline" className="rounded-xl">
                    <Link
                      href={`${URL_CONSTANTS.ACCOUNT_HISTORY}/${account._id}`}
                    >
                      <PreviewRoundedIcon color="primary" />
                    </Link>
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <AddEditAccount
                    buttonName={configJSON.addAmount}
                    isAddAmount
                    isDue={isDue}
                    doReload={doReload}
                    openId={account._id}
                    allExpenseType={allExpenseType}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <DeleteAccount accountId={account._id} doReload={doReload} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-base font-bold">
                {configJSON.total}
              </TableCell>
              <TableCell className="text-right font-bold text-base">
                {total}
              </TableCell>
              <TableCell className="text-base font-bold"></TableCell>
              <TableCell className="text-base font-bold"></TableCell>
              <TableCell className="text-base font-bold"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Suspense>
  );
};

export default page;
