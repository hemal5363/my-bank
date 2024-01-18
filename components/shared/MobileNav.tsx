import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MenuIcon from "@mui/icons-material/Menu";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import Link from "next/link";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Link
            href="/"
            className="w-44 h5-bold text-primary gap-5 flex-center"
          >
            <AccountBalanceRoundedIcon fontSize="large" />
            My Bank
          </Link>
          <Separator className="border border-gray-50" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
