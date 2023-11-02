"use client";

import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { Card } from "@nextui-org/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const { storeUser, storeToken } = useUserStore();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    toast.loading("Logging in...");

    console.log({
      email: data.email,
      password: data.password,
    });
    let payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      toast.dismiss();
      console.log(res);
      if (res?.error) {
        toast.error("Logging in failed");
        return;
        setLoading(false);
      }
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error: any) {
      toast.dismiss();
      console.log(error.response.data);
      toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <section className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center capitalize text-3xl font-bold leading-9 tracking-tight text-gray-900 font-roboto">
            Sign in to your account
          </h2>
        </div>

        <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-xl sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="email"
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
                isInvalid={errors.email ? true : false}
                {...register("email", { required: true })}
              />

              <Input
                label="Password"
                labelPlacement="outside"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                isInvalid={errors.password ? true : false}
                {...register("password", { required: true })}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:text-primary-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold text-primary-500 hover:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  color="primary"
                  className="w-full"
                  type="submit"
                  isDisabled={loading}
                >
                  Sign In
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                href="/register"
                className="font-semibold leading-6 text-primary-500 hover:text-primary-500"
              >
                Register
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
