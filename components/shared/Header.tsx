"use client";

import Link from "next/link";
import React from "react";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Profile from "./Profile";
import { usePathname } from "next/navigation";

const Header = async () => {
  const pathname = usePathname(); // Get the current path
  const hideHeaderRoutes = ["/login", "/sign-up", "/forgot-password"]; // Add all paths where you want to hide the header

  const shouldShowHeader = !hideHeaderRoutes.includes(pathname);

  return (
    shouldShowHeader && (
      <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
          <Link
            href="/"
            className="w-44 h5-bold text-primary gap-5 flex-center"
          >
            <AccountBalanceRoundedIcon fontSize="large" />
            My Bank
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
    )
  );
};

export default Header;
