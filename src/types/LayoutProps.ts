import { ReactNode } from "react";

type LayoutProps<T extends {} = {}> = {
  children: ReactNode;
} & T;

export default LayoutProps;
