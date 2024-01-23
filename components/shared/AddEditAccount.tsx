"use client";

import { useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
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
import { hideLoader, showLoader } from "@/utils/helper";
import { createAccount, updateAccount } from "@/services/accountService";
import { Checkbox } from "../ui/checkbox";

interface IAddEditAccount {
  buttonName: string;
  doReload: () => void;
  isAddAmount?: boolean;
  isExpense?: boolean;
  openId?: string;
  selectedAmount?: number;
}

const AddEditAccount = ({
  buttonName,
  doReload,
  isAddAmount = false,
  isExpense = false,
  openId = "",
  selectedAmount = 0,
}: IAddEditAccount) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [isCredited, setCredited] = useState(false);

  const handleOpenChange = (change: any) => {
    setOpen(change);
    if (change) {
      setAmount(selectedAmount);
    } else {
      setAmount(0);
    }
    setName("");
  };

  const handleSaveClick = async () => {
    handleOpenChange(false);
    showLoader();
    if (isExpense) {
      await updateAccount(openId, amount, true);
    } else if (isAddAmount) {
      await updateAccount(openId, amount, isCredited);
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
          {isAddAmount ? (
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
          {!isExpense ? (
            isAddAmount ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Is Credited
                </Label>
                <Checkbox
                  id="terms"
                  className="col-span-3"
                  checked={isCredited}
                  onCheckedChange={(checked) => setCredited(checked as boolean)}
                />
              </div>
            ) : (
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
                />
              </div>
            )
          ) : (
            <></>
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
            disabled={(!name && !isAddAmount && !isExpense) || !amount}
          >
            {buttonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditAccount;
