"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserAccount } from "@/services/userAccountService";
import {
  hideLoader,
  showLoader,
  validateEmail,
  validatePassword,
} from "@/utils/helper";
import { URL_CONSTANTS } from "@/constants";
import * as configJSON from "@/constants/configJson";

const page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError(configJSON.validEmailAddress);
      return;
    }

    if (!validatePassword(password)) {
      setError(configJSON.passwordValidation);
      return;
    }

    showLoader();

    await createUserAccount({ name, email, password });

    hideLoader();
  };

  return (
    <form
      className="grid place-content-center m-auto h-screen gap-8 max-w-96"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-8 items-center gap-8">
        <Label htmlFor="name" className="text-right col-span-2">
          {configJSON.name}
        </Label>
        <Input
          id="name"
          placeholder="Enter name"
          className="col-span-6"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div className="grid grid-cols-8 items-center gap-8">
        <Button
          type="submit"
          size="lg"
          className="col-span-8"
          disabled={!name || !email || !password}
        >
          {configJSON.signUp}
        </Button>
      </div>
      <div className="text-center">
        {configJSON.alreadyAccount}{" "}
        <Link href={URL_CONSTANTS.LOGIN} className="underline">
          {configJSON.signIn}
        </Link>
      </div>
    </form>
  );
};

export default page;
