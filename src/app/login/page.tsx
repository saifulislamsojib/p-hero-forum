import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center p-3">
      <Card className="w-full max-w-[600px] mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            Login to the <span className="text-blue-500">P-Hero Forum</span>
          </CardTitle>
          <CardDescription>
            The best forum for programmers and developers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <Button variant="ghost">Signup</Button>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
