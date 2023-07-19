"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  userFailure,
  userLoading,
  userLogout,
} from "@/redux/features/user/userSlice";
import { useAppDispatch, useUser } from "@/redux/hooks";
import authService from "@/services/AuthService";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
import { Button } from "../ui/button";
import NavLink from "./NavLink";

const navItems = [
  {
    id: 1,
    path: "/",
    title: "Forum",
  },
  {
    id: 2,
    path: "/about",
    title: "About",
  },
  {
    id: 3,
    path: "/terms",
    title: "Terms & Condition",
  },
];

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const { refresh } = useRouter();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const toastId = toast.loading("Loading...");
    dispatch(userLoading());
    try {
      const res = await authService.logout();
      startTransition(() => {
        refresh();
        dispatch(userLogout());
        toast.dismiss(toastId);
        toast.success(res.message);
      });
    } catch (error) {
      dispatch(userFailure((error as Error).message));
      toast.dismiss(toastId);
      toast.error("Not Logged out!");
      console.log(error);
    }
  };

  return (
    <nav className="bg-slate-100 py-3 sticky top-0">
      <div className="flex items-center gap-10 container">
        <Link href="/">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-accent min-w-max">
            P.H Forum
          </h3>
        </Link>
        <ul className="flex items-center gap-5 text-gray-600 w-full justify-end">
          {navItems.map(({ id, title, path }) => (
            <li key={id} className="min-w-max">
              <NavLink href={path} activeClassName="text-accent" exact>
                {title}
              </NavLink>
            </li>
          ))}
          <li className="flex items-center bg-slate-200 px-2 w-full max-w-[400px] rounded-xl">
            <AiOutlineSearch className="text-xl" />
            <input
              type="text"
              className="bg-transparent focus:outline-none px-2 py-2 w-full"
              placeholder="Search here..."
            />
          </li>
          <li className="flex items-center text-2xl gap-5">
            <LuBellRing className="cursor-pointer" />
            <BiBookmark className="cursor-pointer" />
            <Avatar className="cursor-pointer">
              <AvatarImage alt="user" title={user.name} />
              <AvatarFallback>
                <FaUser />
              </AvatarFallback>
            </Avatar>
            {user._id ? (
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant={pathname.includes("/login") ? "outline" : "link"}
                >
                  Login
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
