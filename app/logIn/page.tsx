"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Input,
} from "@/components/ui";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInShema } from "@/validations/userSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Input = {
  email: string;
  password: string;
};

export default function LogIn() {
  const { toast } = useToast();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(logInShema),
  });

  let [inputType, setInputType] = useState("password");

  function togglePasswordVisivility() {
    setInputType(inputType === "text" ? "password" : "text");
  }

  const onSubmit: SubmitHandler<Input> = async (data) => {

    console.log(data);
    
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });

    console.log(res);
    
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Ups!!!",
        description: res.error,
      });
    }

    router.push("/business")
  };

  return (
    <main>
      <div className="h-full w-full absolute flex">
        <Card className="my-auto mx-auto h-auto md:w-1/2 lg:w-1/3 w-4/5 bg-gray-300 md:p-10">
          <Avatar className="mx-auto mt-8 size-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardHeader>
            <CardTitle className="mx-auto">Log IN</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="email" className="ms-1 mb-1">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="usuario@gmail.com"
                className="border-purple-500 outlined border-2 focus:ring-4 ring-0 ring-purple-300"
              />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <div className="flex w-full justify-between">
                <Label htmlFor="email" className="ms-1 mt-1">
                  Password
                </Label>
                <button
                  type="button"
                  className="me-2"
                  onClick={togglePasswordVisivility}
                >
                  {inputType == "password" ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              <Input
                id="email"
                type={inputType}
                className="border-purple-500 outlined border-2 focus:ring-4 ring-0 ring-purple-300"
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <Link
                href={"/signUp"}
                className="text-blue-400 text-sm underline mx-auto italic"
              >
                Crear cuenta
              </Link>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="flex pe-2 mt-2 bg-gradient-to-r from-purple-500 to-blue-400"
                >
                  Submit
                  <FaAngleRight className="ms-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
