"use client";
import { Email, Password } from "@/components/inputs";
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
import { FaAngleRight } from "react-icons/fa6";

import { logIn } from "@/api";
import { logInData } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { userStore } from "@/app/store/userStore";

export default function LogIn() {
  const { toast } = useToast();
  const seter = userStore((state) => state.logIn);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let email = formData.get("email");
    let password = formData.get("password");

    if (email && password) {
      const data: logInData = {
        email: email.toString(),
        password: password.toString(),
      };
      {
        try {
          let response = await logIn(data);
          toast({
            duration: 3000,
            color: "#4ade80",
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
            <CardTitle className="mx-auto">Log IN</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Email />
              <Password />
              <Link
                href={"/singUp"}
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
