"use client";

import classNames from "@/utils/classNames";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps {
  activeClassName?: string;
  exact?: boolean;
}

const NavLink = ({
  children,
  href,
  exact = false,
  activeClassName,
  ...props
}: NavLinkProps) => {
  const path = usePathname();
  const active =
    typeof href === "string"
      ? exact
        ? path === href
        : path.startsWith(href)
      : false;
  const classes = classNames(props.className, active && activeClassName);
  if (classes) {
    props.className = classes;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
