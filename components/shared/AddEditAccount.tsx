"use client";

import { useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addAmount, createAccount, editAccount } from "@/utils/actions";
import { hideLoader, showLoader } from "@/utils/helper";

interface IAddEditAccount {
  buttonName: string;
  doReload: () => void;
  isEdit?: boolean;
  isAddAmount?: boolean;
  openId?: string;
  selectedName?: string;
  selectedAmount?: number;
}

const AddEditAccount = ({
  buttonName,
  doReload,
  isEdit = false,
  isAddAmount = false,
  openId = "",
  selectedName = "",
  selectedAmount = 0,
}: IAddEditAccount) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const handleOpenChange = (change: any) => {
    setOpen(change);
    if (change) {
      setName(selectedName);
      setAmount(selectedAmount);
    } else {
      setName("");
      setAmount(0);
    }
  };

  const handleSaveClick = async () => {
    handleOpenChange(false);
    showLoader();
    if (isEdit) {
      await editAccount(openId, name, amount);
    } else if (isAddAmount) {
      await addAmount(openId, amount);
    } else {
      await createAccount(name, amount);
    }
    hideLoader();
    doReload();
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-xl">
          {isEdit ? (
            <EditRoundedIcon />
          ) : isAddAmount ? (
            <CurrencyExchangeRoundedIcon />
          ) : (
            <AddCircleOutlineRoundedIcon />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{buttonName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!isAddAmount && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter name"
                className="col-span-3"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                defaultValue={selectedName}
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              className="col-span-3"
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              defaultValue={selectedAmount}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            size="lg"
            onClick={handleSaveClick}
            disabled={(!name && !isAddAmount) || !amount}
          >
            {buttonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditAccount;
