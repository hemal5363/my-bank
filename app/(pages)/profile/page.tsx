"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getUserAccount,
  updateUserAccount,
} from "@/services/userAccountService";
import { hideLoader, showLoader } from "@/utils/helper";
import { IUserAccount } from "@/types";
import * as configJSON from "@/constants/configJson";

const Page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { setUserData } = useUser();

  useEffect(() => {
    showLoader();

    const getUserData = async () => {
      const userData: IUserAccount = await getUserAccount();
      setName(userData.name);
      setEmail(userData.email);
    };

    getUserData();

    hideLoader();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    showLoader();

    const userAccountData = await updateUserAccount({ name });
    if (userAccountData) {
      setUserData(userAccountData);
    }

    hideLoader();
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6 text-center text-3xl font-extrabold">
      <div className="flex sm:flex-row items-center gap-4 justify-center mb-8">
        <h1 className="text-xl font-bold">{configJSON.myProfile}</h1>
      </div>
      <div className="overflow-auto flex flex-col sm:flex-row justify-around items-center">
        <form className="grid gap-8 w-3/4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8">
            <Label htmlFor="name" className="text-right">
              {configJSON.name}
            </Label>
            <Input
              id="name"
              placeholder="Enter name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8">
            <Label htmlFor="email" className="text-right">
              {configJSON.email}
            </Label>
            <Input
              id="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          <div className="flex items-center gap-8 justify-center">
            <Button
              type="submit"
              size="lg"
              className="col-span-10"
              disabled={!name || !email}
            >
              {configJSON.save}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
