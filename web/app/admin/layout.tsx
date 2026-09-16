"use client";

import { Sidebar } from "@/components/admin/components/Sidebar";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (context && context.user === undefined) {
      const stored = localStorage.getItem("user");
      if (!stored) {
        router.push("/signin");
        return;
      }
    }

    if (context?.user && context.user.role !== "ADMIN") {
      router.push("/");
    }
  }, [context?.user]);

  if (!context?.user || context.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-secondary/40">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
