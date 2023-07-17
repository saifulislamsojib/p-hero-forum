import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignupForm from "./SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center p-3">
      <Card className="w-full max-w-[600px] mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            Signup to the <span className="text-blue-500">P-Hero Forum</span>
          </CardTitle>
          <CardDescription>
            The best forum for programmers and developers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
