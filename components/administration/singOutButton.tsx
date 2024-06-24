"use client"
import {
  Button,
} from "@/components/ui";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { signOut } from "next-auth/react";

export default function SingOutButton() {
  return (
    <Button
      onClick={() => signOut()}
      className="bg-gradient-to-b from-cyan-800 to-indigo-400"
    >
      Salir
      <FaRegFaceSadTear className="ms-4 me-1" size={19} />
    </Button>
  );
}
