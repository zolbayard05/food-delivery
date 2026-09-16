"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Truck, LogOut } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const navItems = [
  { label: "Хоолны цэс", href: "/admin/menu", icon: LayoutDashboard },
  { label: "Захиалгууд", href: "/admin/order", icon: Truck },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const context = useContext(UserContext);

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between border-r bg-white px-4 py-6">
      <div>
        <Link href="/" className="mb-8 flex items-center gap-1 px-2 text-xl font-extrabold tracking-tight">
          Nom<span className="text-red-500">Nom</span>
        </Link>

        <nav className="flex flex-col gap-2">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-red-500 text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t pt-4">
        <p className="truncate px-2 text-sm font-medium">
          {context?.user?.email}
        </p>
        <p className="mb-3 px-2 text-xs text-muted-foreground">Админ</p>
        <button
          onClick={context?.logout}
          className="flex w-full items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 cursor-pointer"
        >
          <LogOut size={18} />
          Гарах
        </button>
      </div>
    </aside>
  );
};
