"use client";
import {
  UserName,
  Phone,
  Email,
  Password,
  ConfirmPassword,
} from "@/components/inputs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/index";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

import { useToast } from "@/components/ui/use-toast";
import { createUser } from "@/api";
import { createUserInterface } from "@/interfaces";
import { AxiosError } from "axios";
import { userStore } from "@/app/store/userStore";
import { useState } from "react";

export default function SingUp() {
  const { toast } = useToast();
  const seter = userStore((state) => state.logIn);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let email = formData.get("email");
    let password = formData.get("password");
    let confirmPassword = formData.get("confirmPassword");
    let userName = formData.get("userName");
    let phone = formData.get("phone");
    if (password != confirmPassword) {
      setPasswordError(true);
      setPasswordMessage("This passwords do not match");
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Error",
        description: "Your passwords do not match!!!",
      });
      return;
    }

    if (email && password && userName && phone) {
      const data: createUserInterface = {
        email: email.toString(),
        password: password.toString(),
        user_name: userName.toString(),
        phone: phone.toString(),
      };
      {
        try {
          let response = await createUser(data);
          toast({
            title: "Success",
            description: "You have loged in with success",
          });
          console.log(response);
          seter(response);
        } catch (error) {
          if (error instanceof AxiosError) {
            toast({
              duration: 3000,
              variant: "destructive",
              title: error.response?.statusText,
              description: error.response?.data,
            });
            console.log(error.response?.data);
          }
        }
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
            <CardTitle className="mx-auto">Sing Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Email />
              <UserName />
              <Phone />
              <Password />
              <ConfirmPassword
                passwordError={passwordError}
                passwordMessage={passwordMessage}
              />
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
