"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/services/userAccountService";
import { hideLoader, showLoader, validateEmail } from "@/utils/helper";
import { URL_CONSTANTS } from "@/constants";
import * as configJSON from "@/constants/configJson";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError(configJSON.validEmailAddress);
      return;
    }

    showLoader();

    await forgotPassword({ email });

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
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="grid grid-cols-8 items-center gap-8">
        <Button
          type="submit"
          size="lg"
          className="col-span-8"
          disabled={!email}
        >
          {configJSON.sendEmail}
        </Button>
      </div>
      <div className="text-center">
        {configJSON.goBackToSignIn}{" "}
        <Link href={URL_CONSTANTS.LOGIN} className="underline">
          {configJSON.signIn}
        </Link>
      </div>
    </form>
  );
};

export default Page;
