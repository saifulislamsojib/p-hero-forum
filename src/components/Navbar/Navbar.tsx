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
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
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
  const [navToggle, setNavToggle] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let toastId: string | undefined;
    if (isPending) {
      toastId = toast.loading("Loading...");
    } else if (toastId) {
      toast.dismiss(toastId);
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isPending]);

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
    <nav className="bg-slate-100 py-3 sticky top-0 z-10 border-b shadow">
      <div className="flex items-center justify-between lg:gap-10 container">
        <Link href="/">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-accent min-w-max">
            P.H Forum
          </h3>
        </Link>
        <div
          onClick={() => setNavToggle((pre) => !pre)}
          className="text-3xl cursor-pointer select-none lg:hidden"
        >
          {navToggle ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
        <ul
          className={`flex flex-col lg:flex-row absolute lg:static top-[60px] ${
            navToggle ? "left-0" : "-left-full"
          }  bg-slate-100 lg:bg-transparent items-center gap-2 lg:gap-5 text-gray-600 w-full max-w-xs lg:max-w-none lg:justify-end py-2 lg:py-0 min-h-[calc(100vh-60px)] lg:min-h-0 transition-all duration-300 px-2 lg:px-0`}
        >
          {navItems.map(({ id, title, path }) => (
            <li key={id} className="min-w-max">
              <NavLink
                onClick={() => setNavToggle(false)}
                href={path}
                activeClassName="text-accent"
                exact
              >
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
          <li className="flex flex-col lg:flex-row items-center text-2xl gap-2 lg:gap-5">
            <div className="relative cursor-pointer">
              <LuBellRing />
              <span className="absolute top-[-30%] right-[-20%] text-xs w-4 h-4 flex items-center justify-center rounded-full bg-accent text-accent-foreground">
                0
              </span>
            </div>
            <BiBookmark className="cursor-pointer" />
            {user._id && (
              <Avatar className="cursor-pointer">
                <AvatarImage alt="user" title={user.name} />
                <AvatarFallback title={user.name}>
                  {user.name?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
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
