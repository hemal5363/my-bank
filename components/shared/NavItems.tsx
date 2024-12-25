import { HEADER_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import React from "react";

interface NavItemsProps {
  setOpen?: (open: boolean) => void;
  isMyUserAccountShow?: boolean;
}

const NavItems: React.FC<NavItemsProps> = ({
  setOpen,
  isMyUserAccountShow,
}) => {
  const pathName = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {HEADER_LINKS.map((link, index) => {
        const isActive = pathName.includes(link.href);
        if (index > 3 && !isMyUserAccountShow) {
          return;
        }
        return (
          <React.Fragment key={link.id}>
            {index === 4 && <Separator className="border border-gray-50" />}
            <li
              className={`${
                isActive && "text-primary"
              } flex-center p-medium-16 whitespace-nowrap hover:underline`}
              onClick={() => setOpen?.(false)}
            >
              <Link href={link.href}>{link.title}</Link>
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default NavItems;
