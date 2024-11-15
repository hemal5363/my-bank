"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddEditExpenseType from "@/components/shared/AddEditExpenseType";
import DeleteExpenseType from "@/components/shared/DeleteExpenseType";
import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "@/utils/helper";
import { IExpenseType } from "@/types";
import { getAllExpenseType } from "@/services/expenseTypeService";

const page = () => {
  const [allExpenseTypes, setAllExpenseTypes] = useState<IExpenseType[]>([]);
  const [isReload, setReload] = useState(false);

  useEffect(() => {
    callGetAPI();
  }, [isReload]);

  const callGetAPI = async () => {
    showLoader();
    const { data } = await getAllExpenseType();
    setAllExpenseTypes(data);
    hideLoader();
  };

  const doReload = () => {
    setReload(!isReload);
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6">
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">Expense Type</h1>
        <AddEditExpenseType buttonName="Add" doReload={doReload} />
      </div>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl">Expense Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allExpenseTypes.map((expenseType) => (
            <TableRow key={expenseType._id}>
              <TableCell className="font-medium">{expenseType.name}</TableCell>
              <TableCell className="text-right">
                <AddEditExpenseType
                  buttonName="Edit"
                  isEdit
                  doReload={doReload}
                  openId={expenseType._id}
                  oldName={expenseType.name}
                />
              </TableCell>
              <TableCell className="text-right">
                <DeleteExpenseType
                  expenseTypeId={expenseType._id}
                  doReload={doReload}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
