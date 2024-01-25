import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { IAccountHistory } from "@/types";

const AccountHistoryTable = ({
  allAccountsHistory,
}: {
  allAccountsHistory: IAccountHistory[];
}) => {
  return (
    <Table className="mt-5">
      <TableHeader className="[&_tr]:border-b-0">
        <TableRow className="bg-cyan-100 hover:bg-cyan-300 whitespace-nowrap">
          <TableHead className="text-center text-xl rounded-bl-3xl rounded-tl-3xl">
            Amount
          </TableHead>
          <TableHead className="text-center text-xl">New Amount</TableHead>
          <TableHead className="text-center text-xl">Action</TableHead>
          <TableHead className="text-center text-xl rounded-br-3xl rounded-tr-3xl">
            Date & Time
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
              {accountsHistory.isCredited ? "Credit" : "Debit"}
            </TableCell>
            <TableCell className="text-center rounded-br-3xl rounded-tr-3xl">
              {format(accountsHistory.createdAt, "dd/MM/yyy hh:mm")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountHistoryTable;
