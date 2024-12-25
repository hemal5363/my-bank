"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/services/userAccountService";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Make sure to import `useRouter` from `next/navigation`
import { PASSWORD_REGEX } from "@/constants";
import { hashPassword } from "@/utils/helper";

const Page = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter(); // Hook for client-side navigation

  const validatePassword = (password: string) => {
    return PASSWORD_REGEX.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("The Password and Confirm Password fields must match.");
      return;
    }

    const userAccountData = await resetPassword(
      oldPassword,
      await hashPassword(password)
    );
    if (userAccountData && userAccountData.data) {
      router.push("/login");
    }
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6 text-center text-3xl font-extrabold">
      <div className="flex sm:flex-row items-center gap-4 justify-center mb-8">
        <h1 className="text-xl font-bold">Reset Password</h1>
      </div>
      <div className="overflow-auto flex flex-col sm:flex-row justify-around items-center">
        <form className="grid gap-8 w-3/4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8">
            <Label
              htmlFor="oldPassword"
              className="text-left sm:text-right whitespace-nowrap max-w-32 w-full"
            >
              Old Password
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
              Password
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
              Confirm Password
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
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
