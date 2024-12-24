"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserAccount } from "@/services/userAccountService";
import { hashPassword } from "@/utils/helper";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateEmail = (email: string) => {
    // Regex to validate basic email format
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    // Password strength: at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
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
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    const userAccountData = await createUserAccount(
      name,
      email,
      await hashPassword(password)
    );
    if (userAccountData && userAccountData.data) {
      toast.success(userAccountData.message);
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
