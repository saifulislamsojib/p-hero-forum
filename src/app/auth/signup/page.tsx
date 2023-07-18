import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Signup | P.H Forum",
};

const SignupPage = () => {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">
          Signup to the <span className="text-accent">P.H Forum</span>
        </CardTitle>
        <CardDescription>
          The best forum for programmers and developers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/auth/login">
            <Button variant="link">Login</Button>
          </Link>
        </p>
      </CardContent>
    </>
  );
};

export default SignupPage;
