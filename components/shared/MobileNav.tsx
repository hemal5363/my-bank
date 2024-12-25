"use client";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MenuIcon from "@mui/icons-material/Menu";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { truncateString } from "@/utils/helper";
import { useUser } from "@/hooks/UserContext";

const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);

  const router = useRouter(); // Hook for client-side navigation
  const { userData } = useUser();

  const onLogoutClick = () => {
    localStorage.clear();
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
            className="w-44 text-base font-bold text-primary gap-5 flex-center"
            onClick={() => setOpen(false)}
          >
            Hello, {truncateString(userData.name)}
            <AccountCircleRoundedIcon fontSize="large" />
          </Link>
          <Separator className="border border-gray-50" />
          <NavItems setOpen={setOpen} isMyUserAccountShow />
          <Separator className="border border-gray-50" />

          <Button onClick={onLogoutClick}>Logout</Button>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
