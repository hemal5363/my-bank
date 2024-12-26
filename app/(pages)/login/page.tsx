"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInUserAccount } from "@/services/userAccountService";
import { hideLoader, showLoader, validateEmail } from "@/utils/helper";
import { LOCAL_STORAGE_CONSTANTS, URL_CONSTANTS } from "@/constants";
import * as configJSON from "@/constants/configJson";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const { setUserData } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError(configJSON.validEmailAddress);
      return;
    }

    showLoader();

    const userAccountData = await signInUserAccount({ email, password });
    if (userAccountData && userAccountData.data) {
      localStorage.setItem(
        LOCAL_STORAGE_CONSTANTS.TOKEN,
        userAccountData.token
      );
      setUserData(userAccountData.data);
      router.push(URL_CONSTANTS.DASHBOARD);
    }

    hideLoader();
  };

  return (
    <form
      className="grid place-content-center m-auto h-screen gap-8 max-w-96"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-8 items-center gap-8">
        <Label htmlFor="email" className="text-right col-span-2">
          {configJSON.email}
        </Label>
        <Input
          id="email"
          placeholder="Enter email"
          className="col-span-6"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-8 items-center gap-8">
        <Label htmlFor="password" className="text-right col-span-2">
          {configJSON.password}
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
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="text-right">
        <Link href={URL_CONSTANTS.FORGOT_PASSWORD} className="underline">
          {configJSON.forgotPassword}?
        </Link>
      </div>
      <div className="grid grid-cols-8 items-center gap-8">
        <Button
          type="submit"
          size="lg"
          className="col-span-8"
          disabled={!email || !password}
        >
          {configJSON.signIn}
        </Button>
      </div>
      <div className="text-center">
        {configJSON.doNotHaveAccount}{" "}
        <Link href={URL_CONSTANTS.SIGN_UP} className="underline">
          {configJSON.signUp}
        </Link>
      </div>
    </form>
  );
};

export default Page;
