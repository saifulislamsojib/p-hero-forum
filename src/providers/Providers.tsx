"use client";

import store from "@/redux/store";
import LayoutProps from "@/types/LayoutProps";
import { Provider } from "react-redux";
import UserProvider from "./UserProvider";

const Providers = ({ children }: LayoutProps) => {
  return (
    <Provider store={store}>
      <UserProvider>{children}</UserProvider>
    </Provider>
  );
};

export default Providers;
