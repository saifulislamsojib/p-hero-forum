import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login | P.H Forum",
};

const LoginPage = () => {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">
          Login to the <span className="text-accent">P.H Forum</span>
        </CardTitle>
        <CardDescription>
          The best forum for programmers and developers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup">
            <Button variant="link">Signup</Button>
          </Link>
        </p>
      </CardContent>
    </>
  );
};

export default LoginPage;
