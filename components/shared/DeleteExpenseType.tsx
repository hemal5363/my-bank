"use client";

import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

import { Button } from "@/components/ui/button";
import { hideLoader, showLoader } from "@/utils/helper";
import { deleteExpenseType } from '@/services/expenseTypeService';

const DeleteExpenseType = ({
  expenseTypeId,
  doReload,
}: {
  expenseTypeId: string;
  doReload: () => void;
}) => {
  const handleDeleteClick = async (id: string) => {
    showLoader();
    await deleteExpenseType(id);
    hideLoader();
    doReload();
  };

  return (
    <Button size="icon" variant="destructive" className="rounded-xl" onClick={() => handleDeleteClick(expenseTypeId)}>
      <RemoveCircleOutlineRoundedIcon />
    </Button>
  );
};

export default DeleteExpenseType;
