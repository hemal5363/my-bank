"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { URL_CONSTANTS } from "@/constants";
import * as configJSON from "@/constants/configJson";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Profile from "./Profile";

const Header = () => {
  const pathname = usePathname();

  const hideHeaderRoutes = [
    URL_CONSTANTS.LOGIN,
    URL_CONSTANTS.SIGN_UP,
    URL_CONSTANTS.FORGOT_PASSWORD,
  ];

  const shouldShowHeader = !hideHeaderRoutes.includes(pathname);

  if (!shouldShowHeader) return null;

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link
          href={URL_CONSTANTS.DASHBOARD}
          className="w-44 h5-bold text-primary gap-5 flex-center"
        >
          <AccountBalanceRoundedIcon fontSize="large" />
          {configJSON.myBank}
        </Link>

        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>

        <div className="flex w-32 justify-end gap-3">
          <MobileNav />
        </div>

        <nav className="md:flex-between hidden">
          <Profile />
        </nav>
      </div>
    </header>
  );
};

export default Header;
