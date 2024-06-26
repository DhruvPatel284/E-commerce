import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await prisma.order.create({
      data: body,
    });
    return NextResponse.json(data,{status:200});
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}