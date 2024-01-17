"use client";

import { deleteAccount } from "@/utils/actions";

import { Button } from "@/components/ui/button";

const DeleteAccount = ({ accountId }: { accountId: string }) => {
  const handleDeleteClick = async (id: string) => await deleteAccount(id);

  return <Button onClick={() => handleDeleteClick(accountId)}>Delete</Button>;
};

export default DeleteAccount;
