"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInUserAccount } from "@/services/userAccountService";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Make sure to import `useRouter` from `next/navigation`

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter(); // Hook for client-side navigation

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

    const userAccountData = await signInUserAccount(email, password);
    if (userAccountData && userAccountData.data) {
      await localStorage.setItem("token", userAccountData.token);
      toast.success(userAccountData.message);
      router.push("/");
    } else if (userAccountData && userAccountData.message) {
      toast.error(userAccountData.message);
    }
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
          disabled={!email || !password}
        >
          Sign In
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
