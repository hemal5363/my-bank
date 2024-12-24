"use client";

import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MenuIcon from "@mui/icons-material/Menu";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);

  const router = useRouter(); // Hook for client-side navigation

  const onLogoutClick = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <nav className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger className="align-middle">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Link
            href="/"
            className="w-44 h5-bold text-primary gap-5 flex-center"
            onClick={() => setOpen(false)}
          >
            <AccountBalanceRoundedIcon fontSize="large" />
            My Bank
          </Link>
          <Separator className="border border-gray-50" />
          <NavItems setOpen={setOpen} />

          <Button onClick={onLogoutClick}>Logout</Button>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
