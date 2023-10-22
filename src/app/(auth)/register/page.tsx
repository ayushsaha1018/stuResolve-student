"use client";

import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState, useRef } from "react";
import { Card } from "@nextui-org/react";
import Link from "next/link";
import { branches, graduatingYear } from "@/app/lib/data";

import { Avatar } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { uploadFiles } from "@/utils/uploadThing";
import { useForm, Controller } from "react-hook-form";

// Provide an initial state of type 'File | undefined'
const initialProfileImg: File | undefined = undefined;

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const uploadInput = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState(initialProfileImg);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    // Handle the case where selectedFile might be null
    // Check if selectedFile is not null before setting the state
    if (selectedFile !== null) {
      setProfileImg(selectedFile);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section className="">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-[1000px]">
          <div className="bg-white px-6 py-6 shadow sm:rounded-lg sm:px-12">
            <div className="w-full flex justify-center mb-5">
              <div className="relative w-fit">
                <Avatar
                  showFallback
                  name={watch("name")}
                  src={profileImg ? URL.createObjectURL(profileImg) : ""}
                  className="w-28 h-28 text-large relative z-[1]"
                />
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  radius="full"
                  aria-label="Like"
                  className="absolute bottom-0 right-0 z-[5]"
                  onClick={() => uploadInput?.current?.click()}
                >
                  <Pencil className="h-5 w-5" />
                </Button>
                <input
                  accept="image/*"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  ref={uploadInput}
                />
              </div>
            </div>

            <form
              className="gap-6 grid grid-cols-1 lg:grid-cols-2 "
              action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                type="text"
                label="Name"
                labelPlacement="outside"
                placeholder="Enter your name"
                isInvalid={errors.name ? true : false}
                {...register("name", { required: true })}
              />

              <Input
                type="email"
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
                isInvalid={errors.email ? true : false}
                {...register("email", { required: true })}
              />

              <Controller
                name="branch"
                control={control}
                rules={{ required: true }} // Add your validation rules here
                render={({ field: { onChange, value } }) => (
                  <Select
                    items={branches}
                    label="Branch"
                    labelPlacement="outside"
                    placeholder="Select a branch"
                    className="w-full"
                    onChange={onChange}
                    selectedKeys={value ? [value] : []}
                    isInvalid={errors.branch ? true : false}
                  >
                    {(branch) => (
                      <SelectItem key={branch.value} value={branch.value}>
                        {branch.label}
                      </SelectItem>
                    )}
                  </Select>
                )}
              />

              <Controller
                name="year"
                control={control}
                rules={{ required: true }} // Add your validation rules here
                render={({ field: { onChange, value } }) => (
                  <Select
                    items={graduatingYear}
                    label="Graduating Year"
                    labelPlacement="outside"
                    placeholder="Select a year"
                    className="w-full"
                    onChange={onChange}
                    selectedKeys={value ? [value] : []}
                    isInvalid={errors.year ? true : false}
                  >
                    {(year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    )}
                  </Select>
                )}
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

              <Input
                label="Confirm Password"
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
                isInvalid={errors.cnfPassword ? true : false}
                {...register("cnfPassword", { required: true })}
              />

              <div className="lg:col-span-2">
                <Button color="primary" className="w-full" type="submit">
                  Sign Up
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                href="/login"
                className="font-semibold leading-6 text-primary hover:text-primary"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
