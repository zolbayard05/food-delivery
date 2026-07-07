"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Truck, Settings } from "lucide-react";

const navItems = [
  { label: "Food menu", href: "/admin/menu", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/order", icon: Truck },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-white px-4 py-6">
      {/* Nav */}
      <nav className="flex flex-col gap-3">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-full px-6 py-3 text-base font-medium transition ${
                active
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-900 hover:bg-zinc-200"
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
