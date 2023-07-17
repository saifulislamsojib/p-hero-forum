"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService from "@/services/AuthService";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const search = useSearchParams();
  const from = search.get("redirectUrl") || "/";
  const { replace, refresh } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const toastId = toast.loading("User Login...");
    try {
      const data = await authService.login({ email, password });
      if ("error" in data) {
        toast.dismiss(toastId);
        toast.error(data.error);
      } else {
        startTransition(() => {
          refresh();
          toast.dismiss(toastId);
          toast.success(data.message);
          replace(from);
        });
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-base mt-1">
              Enter your valid email address.
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <span className="text-red-500 text-base mt-1">
              Enter your valid password.
            </span>
          )}
        </div>
      </div>
      <Button className="ml-auto block mt-5">Login</Button>
    </form>
  );
};

export default LoginForm;