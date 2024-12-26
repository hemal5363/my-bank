"use client";

import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "@/utils/helper";
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
import { getAllExpenseType } from "@/services/expenseTypeService";
import { IExpenseType } from "@/types";
import * as configJSON from "@/constants/configJson";

const page = () => {
  const [allExpenseTypes, setAllExpenseTypes] = useState<IExpenseType[]>([]);
  const [isReload, setReload] = useState(false);

  useEffect(() => {
    const callGetAPI = async () => {
      showLoader();
      const data = await getAllExpenseType();
      setAllExpenseTypes(data);
      hideLoader();
    };

    callGetAPI();
  }, [isReload]);

  const doReload = () => {
    setReload(!isReload);
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6">
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">{configJSON.expenseType}</h1>
        <AddEditExpenseType buttonName={configJSON.add} doReload={doReload} />
      </div>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl">{configJSON.expenseName}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allExpenseTypes.map((expenseType) => (
            <TableRow key={expenseType._id}>
              <TableCell className="font-medium">{expenseType.name}</TableCell>
              <TableCell className="text-right">
                <AddEditExpenseType
                  buttonName={configJSON.edit}
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
