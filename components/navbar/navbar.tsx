import { Button } from "../ui";
import { FaHouse } from "react-icons/fa6";
import { FaTags } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { getServerSession } from "next-auth/next";

import { SearchDialog } from "./searchButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Navbar() {
  const buttonsColor = "#5161d5";

  const sesion = await getServerSession(authOptions);

  return (
    <div className="flex md:px-5 bg-slate-300 rounded-lg fixed bottom-0 h-10 md:h-10 w-screen justify-around">
      <Link href={"/dashboard"}>
        <Button variant={"ghost"}>
          <FaHouse size={18} color={buttonsColor} />
        </Button>
      </Link>
      <Button variant={"ghost"}>
        <FaTags size={18} color={buttonsColor} />
      </Button>
      <SearchDialog buttonsColor={buttonsColor} />
      {sesion?.user ? (
        <>
          <Link href={"/dashboard/administration"}>
            <Button variant={"ghost"}>
              <FaGear size={18} color={buttonsColor} />
            </Button>
          </Link>
        </>
      ) : null}
    </div>
  );
}
