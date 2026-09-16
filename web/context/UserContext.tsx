"use client";

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "@/lib/api";

type UserType = {
  email: string;
  _id: string;
  role: "ADMIN" | "USER";
  phoneNumber?: string;
  address?: string;
};

type UserContextType = {
  user: UserType | undefined;
  signIn: (_email: string, _password: string) => Promise<string | null>;
  handleEmail: (_email: string) => void;
  signUp: (_password: string) => Promise<string | null>;
  logout: () => void;
  verifyEmail: (_token: string) => Promise<string>;
  forgotPassword: (_email: string) => Promise<string>;
  resetPassword: (_token: string, _password: string) => Promise<string | null>;
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
      const response = await api.post("/user/signin", {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        router.push("/");
        return null;
      }

      return response.data.message as string;
    } catch (error: any) {
      return (
        error?.response?.data?.message ?? "Nevterehed aldaa garlaa"
      );
    }
  };

  const signUp = async (password: string) => {
    try {
      const response = await api.post("/user/signup", {
        email,
        password,
      });
      if (response.status === 200) {
        router.push("/signin");
        return null;
      }
      return response.data.message as string;
    } catch (error: any) {
      return (
        error?.response?.data?.message ?? "Burtguuleh uyd aldaa garlaa"
      );
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const response = await api.get("/user/verify", { params: { token } });
      return response.data.message as string;
    } catch (error: any) {
      return (
        error?.response?.data?.message ?? "Batalgaajuulahad aldaa garlaa"
      );
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await api.post("/user/forgot-password", { email });
      return response.data.message as string;
    } catch (error: any) {
      return error?.response?.data?.message ?? "Aldaa garlaa";
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      const response = await api.post("/user/reset-password", {
        token,
        password,
      });
      if (response.status === 200) {
        return null;
      }
      return response.data.message as string;
    } catch (error: any) {
      return error?.response?.data?.message ?? "Aldaa garlaa";
    }
  };

  const loadUser = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return;
    }

    setUser(JSON.parse(user));
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleEmail = (email: string) => {
    setEmail(email);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        handleEmail,
        signUp,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
