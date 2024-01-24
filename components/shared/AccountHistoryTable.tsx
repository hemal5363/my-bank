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
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-xl">Amount</TableHead>
          <TableHead className="text-center text-xl">New Amount</TableHead>
          <TableHead className="text-center text-xl">Action</TableHead>
          <TableHead className="text-center text-xl">Date & Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allAccountsHistory.map((accountsHistory: IAccountHistory) => (
          <TableRow key={accountsHistory._id}>
            <TableCell className="text-center">
              {accountsHistory.amount}
            </TableCell>
            <TableCell className="text-center">
              {accountsHistory.newAmount}
            </TableCell>
            <TableCell className="text-center">
              {accountsHistory.isCredited ? "Credit" : "Debit"}
            </TableCell>
            <TableCell className="text-center">
              {format(accountsHistory.createdAt, "dd/MM/yyy hh:mm")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountHistoryTable;
