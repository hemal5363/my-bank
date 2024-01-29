"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems =  ({
  setOpen,
  expenseId,
}: {
  setOpen?: (open: boolean) => void;
  expenseId: string;
}) => {
  const pathName = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathName.includes(link.href);
        return (
          <li
            key={link.id}
            className={`${
              isActive && "text-primary"
            } flex-center p-medium-16 whitespace-nowrap hover:underline`}
            onClick={() => setOpen?.(false)}
          >
            <Link href={link.href.replace("[EXPENSE_ID]", expenseId)}>
              {link.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
