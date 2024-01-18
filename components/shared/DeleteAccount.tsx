"use client";

import { deleteAccount } from "@/utils/actions";

import { Button } from "@/components/ui/button";
import { hideLoader, showLoader } from "@/utils/helper";

const DeleteAccount = ({
  accountId,
  doReload,
}: {
  accountId: string;
  doReload: () => void;
}) => {
  const handleDeleteClick = async (id: string) => {
    showLoader();
    await deleteAccount(id);
    hideLoader();
    doReload();
  };

  return (
    <Button variant="destructive" onClick={() => handleDeleteClick(accountId)}>
      Delete
    </Button>
  );
};

export default DeleteAccount;
