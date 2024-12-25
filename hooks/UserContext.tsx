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
  email: "", // Initialize other properties here
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserDataState] = useState<IUserAccount>(defaultUserData);

  useEffect(() => {
    const storedUserData =
      typeof window !== "undefined" ? localStorage.getItem("userData") : null;

    const initialUserData: IUserAccount = storedUserData
      ? JSON.parse(storedUserData)
      : defaultUserData;

    setUserDataState(initialUserData);
  }, []);

  const updateUserData = (newUserData: IUserAccount) => {
    setUserDataState(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData)); // Store the updated user data in localStorage
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
