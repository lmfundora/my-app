import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { FaPlus } from "react-icons/fa6";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NewProductForm, SingOutButton } from "@/components/administration";
import { signOut } from "next-auth/react";

export default async function Administation() {
  const sesion = await getServerSession(authOptions);

  return (
    <div className="flex h-screen bg-gray-200">
      <Card className="px-3 py-4 md:mx-auto mx-4 my-auto h-fit shadow-lg">
        <CardTitle className="mx-6 mt-4">Administración</CardTitle>
        <CardDescription className="mx-6 text-wrap">
          Aquí podrás realizar acciones relacionadas con la administración de tu
          negocio
        </CardDescription>
        <CardHeader>Admin: {sesion?.user?.email}</CardHeader>

        <CardHeader>Acciones</CardHeader>
        <CardContent className="w-full">
          <NewProductForm />
          <Button className="w-11/12 mx-2 mt-2 bg-gradient-to-br from-blue-500 to-indigo-500 hover:ring hover:ring-blue-500 hover:outline-none hover:ring-offset-2">
            <FaPlus className="mx-4" />
            Crear nueva Categoría
          </Button>
        </CardContent>
        <CardFooter className="flex justify-end">
          <SingOutButton />
        </CardFooter>
      </Card>
    </div>
  );
}
