"use client";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { Button } from "@/components/ui/button";
import { getAllAccountHistoryByAccountId } from "@/services/accountHistoryService";
import { useEffect, useState } from "react";
import { IAccount, IAccountHistory } from "@/types";
import { hideLoader, showLoader } from "@/utils/helper";
import { useRouter } from "next/navigation";
import AccountHistoryTable from "@/components/shared/AccountHistoryTable";

const page = ({ params }: { params: { accountId: string } }) => {
  const [allAccountsHistory, setAllAccountsHistory] = useState<
    IAccountHistory[]
  >([]);
  const [account, setAccount] = useState<IAccount>();

  const router = useRouter();

  useEffect(() => {
    const callGetAPI = async () => {
      showLoader();
      const { data, account: accountData } =
        await getAllAccountHistoryByAccountId(params.accountId);
      setAllAccountsHistory(data);
      setAccount(accountData);
      hideLoader();
    };

    callGetAPI();
  }, []);

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6">
      <div className="flex sm:flex-row justify-between items-center gap-4 mb-5">
        <h1 className="text-xl font-bold">
          My Accounts History ({account?.name})
        </h1>
        <Button
          size="icon"
          className="rounded-xl"
          onClick={() => router.back()}
        >
          <ArrowBackRoundedIcon />
        </Button>
      </div>
      <AccountHistoryTable allAccountsHistory={allAccountsHistory} />
    </div>
  );
};

export default page;
