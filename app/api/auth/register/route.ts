import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const data = await request.json();

  data.password = await bcrypt.hash(data.password, 10)

  try {
    
    const newUser = await db.user.create({
      data,
    });
    

    return NextResponse.json(newUser,{status: 201});
  } catch (error) {
    return NextResponse.json(error, {status: 403})
  }
}
