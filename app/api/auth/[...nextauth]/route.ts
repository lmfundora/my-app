import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

interface User {
  id: string;
  name: string;
  email: string;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@correo.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: any
      ): Promise<User | null> {
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!userFound) throw new Error("Usuario o contraseña incorrectos");

        let matchPassword;
        if (credentials?.password) {
          matchPassword = await bcrypt.compare(
            credentials.password,
            userFound.password
          );
        }

        if (!matchPassword) {
          throw new Error("Usuario o contraseña incorrectos");
        } else {
          return {
            id: userFound.id.toString(),
            name: userFound.userName,
            email: userFound.email,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/logIn",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
