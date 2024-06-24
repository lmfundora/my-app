import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    
    const newProduct = await db.products.create({
      data,
    });
    

    return NextResponse.json(newProduct,{status: 201});
  } catch (error) {
    return NextResponse.json(error, {status: 403})
  }
}