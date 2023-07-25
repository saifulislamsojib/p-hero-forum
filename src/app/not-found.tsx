import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="font-semibold text-3xl text-red-500">404</h1>
      <h2 className="font-semibold text-xl text-red-500">Page Not Found</h2>
      <Link href="/" className="mt-5 mb-2 inline-block">
        <Button className="">Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
