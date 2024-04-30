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
} from "@/components/ui/index";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { singInShema } from "@/validations/userSchema";
import { useRouter } from "next/navigation";

type Input = {
  email: string;
  userName: string;
  phone: string;
  password: string;
  confirmpassword?: string;
};

export default function SingUp() {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(singInShema),
  });

  let [inputType, setInputType] = useState("password");

  function togglePasswordVisivility() {
    setInputType(inputType === "text" ? "password" : "text");
  }

  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      delete data.confirmpassword;

      await axios.post("/api/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast({
        variant: "default",
        className: "bg-green-300",
        title: "Felicitaciones",
        description: "Usuario creado exitosamente",
      });
      router.push("/logIn");
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        switch (error.response?.data.code) {
          case "P2002":
            toast({
              variant: "destructive",
              title: "Error al crear usuario",
              description:
                "El " + error.response?.data.meta.target[0] + " ya existe",
            });

            break;

          case "P1001":
            toast({
              variant: "destructive",
              title: "Error al crear usuario",
              description: "Imposible conectar con la DB",
            });

            break;

          default:
            toast({
              variant: "destructive",
              title: "Error al crear usuario",
              description: "Contacte con soporte",
            });

            break;
        }
      } else {
        console.log("siu");
        toast({
          variant: "destructive",
          title: "Error al crear usuario",
          description: "Contacte con soporte",
        });
      }
    }
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
            <CardTitle className="mx-auto">Sign Up</CardTitle>
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
              <Label htmlFor="email" className="ms-1 mb-1">
                User name
              </Label>
              <Input
                id="user_name"
                {...register("userName")}
                type="phone"
                placeholder="usuario"
                className="border-purple-500 outlined border-2 focus:ring-4 ring-0 ring-purple-300"
              />
              {errors.userName?.message && (
                <p className="text-red-500">{errors.userName.message}</p>
              )}
              <Label htmlFor="email" className="ms-1 mb-1">
                Phone number
              </Label>
              <Input
                id="email"
                {...register("phone")}
                type="text"
                placeholder="55555555"
                className="border-purple-500 outlined border-2 focus:ring-4 ring-0 ring-purple-300"
              />
              {errors.phone?.message && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
              <div className="flex w-full justify-between mb-1">
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
                id="password"
                {...register("password")}
                type={inputType}
                placeholder="********"
                className="border-purple-500 outlined border-2 focus:ring-4 ring-0 ring-purple-300"
              />
              {errors.password?.message && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div className="flex w-full justify-between mb-1">
                <Label htmlFor="email" className="ms-1 mt-1 mb-1">
                  Confirm Password
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
                id="confirmPassword"
                {...register("confirmpassword")}
                type={inputType}
                placeholder="********"
                className="border-purple-500 outlined border-2 focus:ring-4 ring-0 ring-purple-300"
              />
              {errors.confirmpassword?.message && (
                <p className="text-red-500">{errors.confirmpassword.message}</p>
              )}

              <Link
                href={"/logIn"}
                className="text-blue-400 text-sm underline mx-auto italic"
              >
                Log In
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
