import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddEditAccount from "@/components/shared/AddEditAccount";
import { getAllAccount } from "@/utils/actions";
import DeleteAccount from "@/components/shared/DeleteAccount";

const page = async () => {
  const allAccounts = await getAllAccount();

  let total = 0;
  allAccounts.forEach((account) => {
    total = total + account.amount;
  });

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6">
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">My Accounts</h1>
        <AddEditAccount buttonName="Add Account" />
      </div>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl">Account Name</TableHead>
            <TableHead className="text-right text-xl">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAccounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.name}</TableCell>
              <TableCell className="text-right">{account.amount}</TableCell>
              <TableCell className="text-right">
                <AddEditAccount
                  buttonName="Edit Account"
                  isEdit
                  openId={account.id}
                  selectedName={account.name}
                  selectedAmount={account.amount}
                />
              </TableCell>
              <TableCell className="text-right">
                <DeleteAccount accountId={account.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-base font-bold">Total</TableCell>
            <TableCell className="text-right font-bold text-base">
              {total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default page;
