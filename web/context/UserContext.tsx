"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

type UserType = {
  email: string;
  password: string;
  _id: string;
};

type UserContextType = {
  user: UserType | undefined;
  signIn: (_email: string, _password: string) => void;
  handleEmail: (_email: string) => void;
  signUp: (_password: string) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/");
      }
    } catch (error) {}
  };

  const signUp = async (password: string) => {
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        email,
        password,
      });
      if (response.status === 200) {
        router.push("/signin");
      }
    } catch (error) {}
  };

  const loadUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      return;
    }
    setUser(JSON.parse(user));
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  };

  const handleEmail = (email: string) => {
    setEmail(email);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, signIn, handleEmail, signUp, logout }}>
      {children}
    </UserContext.Provider>
  );
};
