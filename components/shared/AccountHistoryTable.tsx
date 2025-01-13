import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAccountHistory, IExpenseType } from "@/types";
import { DATE_FORMAT } from "@/constants";
import * as configJSON from "@/constants/configJson";

const AccountHistoryTable = ({
  allAccountsHistory,
}: {
  allAccountsHistory: IAccountHistory[];
}) => {
  return (
    <Table>
      <TableHeader className="[&_tr]:border-b-0">
        <TableRow className="bg-cyan-100 hover:bg-cyan-300 whitespace-nowrap">
          <TableHead className="text-center text-xl rounded-bl-3xl rounded-tl-3xl">
            {configJSON.amount}
          </TableHead>
          <TableHead className="text-center text-xl">
            {configJSON.newAmount}
          </TableHead>
          <TableHead className="text-center text-xl">
            {configJSON.expenseType}
          </TableHead>
          <TableHead className="text-center text-xl">
            {configJSON.action}
          </TableHead>
          <TableHead className="text-center text-xl rounded-br-3xl rounded-tr-3xl">
            {configJSON.dateAndTime}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allAccountsHistory.map((accountsHistory: IAccountHistory) => (
          <TableRow
            key={accountsHistory._id}
            className={`border-b-0 ${
              accountsHistory.isCredited
                ? "bg-green-100 hover:bg-green-300"
                : "bg-rose-100 hover:bg-rose-300"
            }`}
          >
            <TableCell className="text-center rounded-bl-3xl rounded-tl-3xl">
              {accountsHistory.amount}
            </TableCell>
            <TableCell className="text-center">
              {accountsHistory.newAmount}
            </TableCell>
            <TableCell className="text-center">
              {(accountsHistory._expenseType as IExpenseType).name || "-"}
            </TableCell>
            <TableCell className="text-center">
              {accountsHistory.isCredited
                ? configJSON.credit
                : configJSON.debit}
            </TableCell>
            <TableCell className="text-center rounded-br-3xl rounded-tr-3xl">
              {format(accountsHistory.createdAt, DATE_FORMAT)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountHistoryTable;
