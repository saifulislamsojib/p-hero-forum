"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  name: string;
  email: string;
  role: string;
  batch: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      role: "user",
      batch: "batch-8",
    },
  });

  const [isUser, setIsUser] = useState(true);

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

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    email,
    role,
    password,
    batch,
  }) => {
    const toastId = toast.loading("User Creating...");
    dispatch(userLoading());
    try {
      const data = await authService.signup({
        name,
        email,
        role,
        password,
        batch,
      });

      if ("errors" in data) {
        toast.dismiss(toastId);
        Object.values(data.errors).forEach((error) => toast.error(error));
        dispatch(userFailure("validation failed"));
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
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 text-base mt-1">
              Enter your name.
            </span>
          )}
        </div>
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
              Enter a valid email address.
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="role">Role</Label>

          <Select
            defaultValue="user"
            onValueChange={(value) => {
              setValue("role", value);
              setIsUser(value === "user");
            }}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isUser && (
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="batch">Batch</Label>

            <Select
              defaultValue="batch-8"
              onValueChange={(value) => setValue("batch", value)}
            >
              <SelectTrigger id="batch">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                {[...Array(8)].map((_, i) => (
                  <SelectItem key={i} value={`batch-${i + 1}`}>
                    Batch {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="Enter password"
              type="password"
              autoComplete="new-password"
              className="pr-6"
              {...register("password", { required: true, minLength: 6 })}
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
              Enter a password with 6 characters.
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              placeholder="Enter confirm password"
              type="password"
              autoComplete="new-password"
              className="pr-6"
              {...register("confirmPassword", {
                required: true,
                minLength: 6,
                validate: (value) =>
                  value === getValues("password") ||
                  "The passwords do not match.",
              })}
            />
            <div
              className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-1 select-none text-xl"
              onClick={() => setPasswordShowing((pre) => !pre)}
            >
              {isPasswordShowing ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-base mt-1">
              {errors.confirmPassword.message || "Confirm your password."}
            </span>
          )}
        </div>
      </div>
      <Button className="mt-5 mb-2 block ml-auto">Signup</Button>
    </form>
  );
};

export default SignupForm;
