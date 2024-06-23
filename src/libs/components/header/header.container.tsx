"use client";

import Link from "next/link";
import Image from "next/image";
import Icon from "assets/icon.png";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Jobfair",
    link: "/jobfair",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "CV",
    link: "/cv",
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <div className="w-full border-2 border-grey-100">
      <div className="my-2 container">
        <div className="flex space-x-6 items-center">
          <Image
            src={Icon}
            alt="Icon Logo"
            className=""
            width={64}
            height={64}
            priority
          />
          <div className="flex-1 flex space-x-4">
            {navLinks.map((nav) => {
              const isActive = pathname.startsWith(nav.link);
              return (
                <Link
                  key={nav.link}
                  className={
                    "font-semibold text-grey-400 hover:text-grey-700 " +
                    (isActive ? "text-grey-700" : "")
                  }
                  href={nav.link}
                >
                  {nav.name}
                </Link>
              );
            })}
          </div>
          <div className="flex space-x-4 ">
            <button className="font-bold text-grey-500">Masuk</button>
            <button className="bg-primary text-white font-bold py-2 px-4 rounded-xl">
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
