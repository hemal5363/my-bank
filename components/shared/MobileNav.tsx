"use client";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MenuIcon from "@mui/icons-material/Menu";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { truncateString } from "@/utils/helper";

const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>();

  const router = useRouter(); // Hook for client-side navigation

  useEffect(() => {
    const userDataJson = localStorage.getItem("userData");
    if (userDataJson) {
      const userData = JSON.parse(userDataJson);
      setUserName(userData.name);
    }
  }, []);

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
            className="w-44 text-base font-bold text-primary gap-5 flex-center"
            onClick={() => setOpen(false)}
          >
            Hello, {truncateString(userName)}
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
