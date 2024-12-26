"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/services/userAccountService";
import { hideLoader, showLoader, validatePassword } from "@/utils/helper";
import { URL_CONSTANTS } from "@/constants";
import * as configJSON from "@/constants/configJson";

const Page = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError(configJSON.passwordValidation);
      return;
    }

    if (password !== confirmPassword) {
      setError(configJSON.passwordAndConfirmPasswordMatch);
      return;
    }

    showLoader();

    const userAccountData = await resetPassword({
      oldPassword,
      password,
    });
    if (userAccountData) {
      router.push(URL_CONSTANTS.LOGIN);
    }

    hideLoader();
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6 text-center text-3xl font-extrabold">
      <div className="flex sm:flex-row items-center gap-4 justify-center mb-8">
        <h1 className="text-xl font-bold">{configJSON.resetPassword}</h1>
      </div>
      <div className="overflow-auto flex flex-col sm:flex-row justify-around items-center">
        <form className="grid gap-8 w-3/4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8">
            <Label
              htmlFor="oldPassword"
              className="text-left sm:text-right whitespace-nowrap max-w-32 w-full"
            >
              {configJSON.oldPassword}
            </Label>
            <Input
              id="oldPassword"
              placeholder="Enter old password"
              required
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8">
            <Label
              htmlFor="password"
              className="text-left sm:text-right whitespace-nowrap max-w-32 w-full"
            >
              {configJSON.password}
            </Label>
            <Input
              id="password"
              placeholder="Enter password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8">
            <Label
              htmlFor="confirmPassword"
              className="text-left sm:text-right whitespace-nowrap max-w-32 w-full"
            >
              {configJSON.confirmPassword}
            </Label>
            <Input
              id="confirmPassword"
              placeholder="Enter confirm password"
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-red-500 text-left text-sm text-w font-normal">
              {error}
            </div>
          )}
          <div className="flex items-center gap-8 justify-center">
            <Button
              type="submit"
              size="lg"
              className="col-span-10"
              disabled={!oldPassword || !password || !confirmPassword}
            >
              {configJSON.resetPassword}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
