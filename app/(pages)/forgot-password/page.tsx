"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/services/userAccountService";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    await forgotPassword(email);
  };

  return (
    <form
      className="grid place-content-center m-auto h-screen gap-8 max-w-96"
      onSubmit={handleSubmit}
    >
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
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="grid grid-cols-8 items-center gap-8">
        <Button
          type="submit"
          size="lg"
          className="col-span-8"
          disabled={!email}
        >
          Send Email
        </Button>
      </div>
      <div className="text-center">
        If you don't have an account?{" "}
        <Link href="/sign-up" className="underline">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default Page;
