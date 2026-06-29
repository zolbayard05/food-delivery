"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { email } from "zod";

type UserType = {
  email: string;
  password: string;
  _id: string;
};

type UserContextType = {
  user: UserType | undefined;
  signIn: (_email: string, _password: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setUser(response.data.user);
        router.push("/");
      }
    } catch (error) {}
  };

  return (
    <UserContext.Provider value={{ user, signIn }}>
      {children}
    </UserContext.Provider>
  );
};
