"use client";

import { useEffect, useState } from "react";

type CategoryType = {
  categoryName: string;
  _id: string;
};

export const CategoryNav = ({ categories }: { categories: CategoryType[] }) => {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(`category-${c._id}`))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-160px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  if (categories.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="sticky top-20 z-30 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => {
          const id = `category-${c._id}`;
          const isActive = active === id;
          return (
            <button
              key={c._id}
              onClick={() => scrollTo(id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                isActive
                  ? "bg-red-500 text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              {c.categoryName}
            </button>
          );
        })}
      </div>
    </div>
  );
};
