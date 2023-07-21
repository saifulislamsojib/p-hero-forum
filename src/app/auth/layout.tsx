import { Card } from "@/components/ui/card";
import LayoutProps from "@/types/LayoutProps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | P.H Forum",
};

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-[calc(100vh-85px)] flex items-center mb-1">
      <Card className="w-full max-w-[600px] mx-auto shadow">{children}</Card>
    </div>
  );
};

export default AuthLayout;
