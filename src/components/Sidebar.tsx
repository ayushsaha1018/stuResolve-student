"use client";

import { useUserStore } from "@/store/user";
import { DotIcon, HomeIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import toast from "react-hot-toast";

const links = [
  {
    label: "Home",
    href: "#",
    icon: HomeIcon,
  },
  {
    label: "Explore",
    href: "#",
    icon: SearchIcon,
  },
];

const Sidebar = () => {
  const { isLoggedIn, user, logoutUser } = useUserStore();

  console.log(user);

  const logout = () => {
    logoutUser();
    toast.success("Successfully Logged Out");
  };

  return (
    <div className="w-80 bg-gray-100 fixed top-0 left-0 bottom-0 flex flex-col py-5 px-10">
      <h1 className="text-3xl font-roboto font-bold">StuResolve</h1>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 mt-10">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 text-xl font-medium"
            >
              <item.icon />
              <p className="pt-[2px]">{item.label}</p>
            </Link>
          ))}
        </div>

        <div className="pb-2">
          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger>
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex gap-4 items-center">
                    <Avatar name={user?.name} src={user?.image} />
                    <p className="text-xl font-medium font-roboto">
                      {user?.name}
                    </p>
                  </div>
                  <div className="flex items-start">...</div>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="profile">Profile</DropdownItem>
                <DropdownItem key="logout" onClick={logout} color="danger">
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Link href="/login">
              <Button color="primary" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
