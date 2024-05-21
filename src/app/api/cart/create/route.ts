import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const data = await prisma.cart.create({
      data: body,
    });
    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}