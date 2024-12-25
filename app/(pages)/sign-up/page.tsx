"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants";
import { createUserAccount } from "@/services/userAccountService";
import { hashPassword } from "@/utils/helper";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateEmail = (email: string) => {
    return EMAIL_REGEX.test(email);
  };

  const validatePassword = (password: string) => {
    return PASSWORD_REGEX.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number."
      );
      return;
    }

    await createUserAccount(name, email, await hashPassword(password));
  };

  return (
    <form
      className="grid place-content-center m-auto h-screen gap-8 max-w-96"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-8 items-center gap-8">
        <Label htmlFor="name" className="text-right col-span-2">
          Name
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
          Email
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
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="grid grid-cols-8 items-center gap-8">
        <Button
          type="submit"
          size="lg"
          className="col-span-8"
          disabled={!name || !email || !password}
        >
          Sign Up
        </Button>
      </div>
      <div className="text-center">
        If you have already account?{" "}
        <Link href="/login" className="underline">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default page;
