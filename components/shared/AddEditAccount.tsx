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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createAccount,
  updateAccount,
  updateExpenseAccount,
} from "@/services/accountService";
import { hideLoader, showLoader } from "@/utils/helper";
import { IAccount, IExpenseType } from "@/types";
import { ACCOUNT_TYPES } from "@/constants";
import * as configJSON from "@/constants/configJson";

interface IAddEditAccount {
  buttonName: string;
  doReload: () => void;
  isAddAmount?: boolean;
  isDue?: boolean;
  isExpense?: boolean;
  isExpenseDebit?: boolean;
  openId?: string;
  accountList?: IAccount[];
  allExpenseType: IExpenseType[];
}

const AddEditAccount = ({
  buttonName,
  doReload,
  isAddAmount = false,
  isDue = false,
  isExpense = false,
  isExpenseDebit = false,
  openId = "",
  accountList,
  allExpenseType,
}: IAddEditAccount) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [accountId, setAccountId] = useState("");
  const [expenseTypeId, setExpenseTypeId] = useState("");
  const [isCredited, setCredited] = useState(false);

  const handleOpenChange = (change: boolean) => {
    setOpen(change);
    setAmount(0);
    setName("");
    setExpenseTypeId("");
  };

  const handleSaveClick = async () => {
    handleOpenChange(false);
    showLoader();
    if (isExpense) {
      await updateExpenseAccount(openId, amount, accountId, expenseTypeId);
    } else if (isAddAmount) {
      await updateAccount(openId, { amount, isCredited, expenseTypeId });
    } else {
      await createAccount({
        name,
        amount: isDue ? -amount : amount,
        type: isDue ? ACCOUNT_TYPES.Due : ACCOUNT_TYPES.Account,
        expenseTypeId,
      });
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
                <Label htmlFor="isCredited" className="text-right">
                  {configJSON.isCredited}
                </Label>
                <Checkbox
                  id="isCredited"
                  className="col-span-3"
                  checked={isExpenseDebit ? false : isCredited}
                  onCheckedChange={(checked) => setCredited(checked as boolean)}
                  disabled={isExpenseDebit}
                />
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {configJSON.name}
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="from" className="text-right">
                {configJSON.from}
              </Label>
              <Select onValueChange={(v) => setAccountId(v)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select bank account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {accountList?.map((list) => (
                      <SelectItem value={list._id} key={list._id}>
                        {list.name} ({list.amount})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              {configJSON.amount}
            </Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              className="col-span-3"
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              {configJSON.expenseType}
            </Label>
            <Select onValueChange={(v) => setExpenseTypeId(v)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select expense type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {allExpenseType?.map((list) => (
                    <SelectItem value={list._id} key={list._id}>
                      {list.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            size="lg"
            onClick={handleSaveClick}
            disabled={
              (!name && !isAddAmount && !isExpense) ||
              !(amount && expenseTypeId) ||
              (isExpense && !accountId)
            }
          >
            {buttonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditAccount;
