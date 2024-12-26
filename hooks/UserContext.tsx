"use client";

import { LOCAL_STORAGE_CONSTANTS } from "@/constants";
import { IUserAccount } from "@/types";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  userData: IUserAccount;
  setUserData: (userData: IUserAccount) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const defaultUserData: IUserAccount = {
  _id: "",
  name: "",
  email: "",
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserDataState] = useState<IUserAccount>(defaultUserData);

  useEffect(() => {
    const storedUserData =
      typeof window !== "undefined"
        ? localStorage.getItem(LOCAL_STORAGE_CONSTANTS.USER_DATA)
        : null;

    const initialUserData: IUserAccount = storedUserData
      ? JSON.parse(storedUserData)
      : defaultUserData;

    setUserDataState(initialUserData);
  }, []);

  const updateUserData = (newUserData: IUserAccount) => {
    setUserDataState(newUserData);
    localStorage.setItem(
      LOCAL_STORAGE_CONSTANTS.USER_DATA,
      JSON.stringify(newUserData)
    );
  };

  return (
    <UserContext.Provider value={{ userData, setUserData: updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
