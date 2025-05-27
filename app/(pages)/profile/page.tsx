"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  deleteUserAccount,
  getUserAccount,
  updateUserAccount,
} from "@/services/userAccountService";
import { hideLoader, showLoader } from "@/utils/helper";
import { IUserAccount } from "@/types";
import { URL_CONSTANTS } from "@/constants";
import * as configJSON from "@/constants/configJson";
import ProfileImageUploader from "@/components/shared/ProfileImageUploader";

const Page = () => {
  const [profileImageFile, setProfileImageFile] = useState<File | null>();
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();
  const { setUserData } = useUser();

  useEffect(() => {
    showLoader();

    const getUserData = async () => {
      const userData: IUserAccount = await getUserAccount();
      setName(userData.name);
      setEmail(userData.email);
      setProfileImageUrl(userData.profileImage);
    };

    getUserData();

    hideLoader();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    showLoader();
    const formData = new FormData();

    if (profileImageFile) formData.append("image", profileImageFile);
    else if (profileImageFile === null) formData.append("imageDelete", "true")
    formData.append("name", name);

    const userAccountData = await updateUserAccount(formData);
    if (userAccountData) {
      setUserData(userAccountData);
    }

    hideLoader();
  };

  const handleDeleteClick = async () => {
    const response = await deleteUserAccount();
    if (response.message) {
      router.push(URL_CONSTANTS.LOGIN);
      localStorage.clear();
    }
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6 text-center text-3xl font-extrabold">
      <div className="flex sm:flex-row items-center gap-4 justify-center mb-8">
        <h1 className="text-xl font-bold">{configJSON.myProfile}</h1>
      </div>
      <div className="overflow-auto flex flex-col sm:flex-row justify-around items-center">
        <form className="grid gap-8 w-3/4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8 justify-center">
            <ProfileImageUploader
              setProfileImageFile={setProfileImageFile}
              profileImageUrl={profileImageUrl}
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8">
            <Label htmlFor="name" className="text-right">
              {configJSON.name}
            </Label>
            <Input
              id="name"
              placeholder="Enter name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8">
            <Label htmlFor="email" className="text-right">
              {configJSON.email}
            </Label>
            <Input
              id="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          <div className="flex items-center gap-8 justify-center flex-wrap">
            <Button
              type="submit"
              size="lg"
              className="col-span-10"
              disabled={!name || !email}
            >
              {configJSON.save}
            </Button>
            <Button
              type="button"
              size="lg"
              className="col-span-10 bg-red-600 hover:bg-red-600"
              onClick={handleDeleteClick}
            >
              {configJSON.deleteUserAccount}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
