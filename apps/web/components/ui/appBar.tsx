import Link from "next/link";
import React from "react";
import SignInButton from "../SignInButton";

const menuItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Profile",
    path: "/profile",
  },
];

const AppBar = () => {
  return (
    <div className="p-2 shadow  bg-gradient-to-br bg-slate-950 text-white h-[80px]">
      <div className="container h-full flex justify-between mx-auto gap-3 items-center">
        <ul className="flex gap-6">
          {menuItems.map((item, index) => (
            <Link
              className="hover:text-rose-600 transition-all duration-200"
              key={index}
              href={item.path}
            >
              {item.label}
            </Link>
          ))}
        </ul>
        <SignInButton />
      </div>
    </div>
  );
};

export default AppBar;
