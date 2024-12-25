import Link from "next/link";
import React from "react";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Profile from "./Profile";

interface HeaderProps {
  onLogoutClick: () => void;
  onRedirectionClick: (location: string) => void;
}

const Header: React.FC<HeaderProps> = async ({
  onLogoutClick,
  onRedirectionClick,
}) => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-44 h5-bold text-primary gap-5 flex-center">
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
          <Profile
            onLogoutClick={onLogoutClick}
            onRedirectionClick={onRedirectionClick}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
