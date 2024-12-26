"use client";

import { useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
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
import {
  createExpenseType,
  updateExpenseType,
} from "@/services/expenseTypeService";
import { hideLoader, showLoader } from "@/utils/helper";
import * as configJSON from "@/constants/configJson";

interface IAddEditExpenseType {
  buttonName: string;
  doReload: () => void;
  isEdit?: boolean;
  openId?: string;
  oldName?: string;
}

const AddEditExpenseType = ({
  buttonName,
  doReload,
  isEdit = false,
  openId = "",
  oldName = "",
}: IAddEditExpenseType) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpenChange = (change: any) => {
    setOpen(change);
    if (change) {
      setName(oldName);
    } else {
      setName("");
    }
  };

  const handleSaveClick = async () => {
    handleOpenChange(false);
    showLoader();
    if (isEdit) {
      await updateExpenseType(openId, { name });
    } else {
      await createExpenseType({ name });
    }
    hideLoader();
    doReload();
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-xl">
          {isEdit ? <EditRoundedIcon /> : <AddCircleOutlineRoundedIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{buttonName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
        </div>
        <DialogFooter>
          <Button
            type="submit"
            size="lg"
            onClick={handleSaveClick}
            disabled={!name}
          >
            {buttonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditExpenseType;
