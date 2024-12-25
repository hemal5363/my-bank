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
    <form
      className="grid place-content-center m-auto h-screen gap-8 max-w-96"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-10 items-center gap-8">
        <Label htmlFor="oldPassword" className="text-right col-span-4">
          Old Password
        </Label>
        <Input
          id="oldPassword"
          placeholder="Enter old password"
          className="col-span-6"
          required
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-10 items-center gap-8">
        <Label htmlFor="password" className="text-right col-span-4">
          Password
        </Label>
        <Input
          id="password"
          placeholder="Enter password"
          className="col-span-6"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-10 items-center gap-8">
        <Label htmlFor="confirmPassword" className="text-right col-span-4">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          placeholder="Enter confirm password"
          className="col-span-6"
          required
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="grid grid-cols-10 items-center gap-8">
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
  );
};

export default Page;
