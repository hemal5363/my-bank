"use client"

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { getAllAccountHistoryByAccountId } from "@/services/accountHistoryService";
import { useEffect, useState } from "react";
import { IAccountHistory } from "@/types";
import { hideLoader, showLoader } from "@/utils/helper";

const page = ({ params }: { params: { accountId: string } }) => {
  const [allAccountsHistory, setAllAccountsHistory] = useState<
    IAccountHistory[]
  >([]);
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    callGetAPI();
  }, []);

  const callGetAPI = async () => {
    showLoader();
    const { data, accountName } = await getAllAccountHistoryByAccountId(
      params.accountId
    );
    setAllAccountsHistory(data.data);
    setAccountName(accountName);
    hideLoader();
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6">
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">
          My Accounts History ({accountName})
        </h1>
        <Button size="icon" className="rounded-xl">
          <Link href="/my-accounts">
            <ArrowBackRoundedIcon />
          </Link>
        </Button>
      </div>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-xl">Amount</TableHead>
            <TableHead className="text-center text-xl">New Amount</TableHead>
            <TableHead className="text-center text-xl">Action</TableHead>
            <TableHead className="text-center text-xl">Date & Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAccountsHistory.map((accountsHistory: any) => (
            <TableRow key={accountsHistory.id}>
              <TableCell className="text-center">
                {accountsHistory.amount}
              </TableCell>
              <TableCell className="text-center">
                {accountsHistory.newAmount}
              </TableCell>
              <TableCell className="text-center">
                {accountsHistory.isCredited ? "Credit" : "Debit"}
              </TableCell>
              <TableCell className="text-center">
                {format(accountsHistory.createdAt, "dd/MM/yyy hh:mm")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
