"use client";

import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

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
    <Button size="icon" variant="destructive" className="rounded-xl" onClick={() => handleDeleteClick(accountId)}>
      <RemoveCircleOutlineRoundedIcon />
    </Button>
  );
};

export default DeleteAccount;
