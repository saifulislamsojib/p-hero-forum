"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  userFailure,
  userLoading,
  userLogin,
} from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import authService from "@/services/AuthService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const [isPasswordShowing, setPasswordShowing] = useState(false);

  useEffect(() => {
    let toastId: string | undefined;
    if (isPending) {
      toastId = toast.loading("Loading...");
    } else if (toastId) {
      toast.dismiss(toastId);
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isPending]);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const toastId = toast.loading("User Login...");
    dispatch(userLoading());
    try {
      const data = await authService.login({ email, password });
      if ("error" in data) {
        dispatch(userFailure(data.error));
        toast.dismiss(toastId);
        toast.error(data.error);
      } else {
        startTransition(() => {
          refresh();
          replace(from);
          dispatch(userLogin(data.auth));
          toast.dismiss(toastId);
          toast.success(data.message);
        });
      }
    } catch (error) {
      dispatch(userFailure((error as Error).message));
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
          <div className="relative">
            <Input
              id="password"
              placeholder="Enter your password"
              className="pr-6"
              type={isPasswordShowing ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              autoComplete="current-password"
            />
            <div
              className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-1 select-none text-xl"
              onClick={() => setPasswordShowing((pre) => !pre)}
            >
              {isPasswordShowing ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
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
