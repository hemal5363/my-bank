import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "@/hooks/UserContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { truncateString } from "@/utils/helper";
import { URL_CONSTANTS } from "@/constants";
import * as configJSON from "@/constants/configJson";
import NavItems from "./NavItems";

const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);

  const router = useRouter();

  const { userData } = useUser();

  const onLogoutClick = () => {
    localStorage.clear();
    router.push(URL_CONSTANTS.LOGIN);
  };

  return (
    <nav className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger className="align-middle">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Link
            href={URL_CONSTANTS.DASHBOARD}
            className="w-44 text-base font-bold text-primary gap-5 flex-center"
            onClick={() => setOpen(false)}
          >
            {configJSON.hello}, {truncateString(userData.name)}
            {userData.profileImage ? (
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-9 h-9 rounded-full"
              />
            ) : (
              <AccountCircleRoundedIcon color="primary" fontSize="large" />
            )}
          </Link>
          <Separator className="border border-gray-50" />
          <NavItems setOpen={setOpen} isMyUserAccountShow />
          <Separator className="border border-gray-50" />

          <Button onClick={onLogoutClick}>{configJSON.logout}</Button>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
