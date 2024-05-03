import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        phoneno: true,
        orders: true,
        carts: true,
        updatedAt: true,
        createdAt: true,
        address:true,
      },
    });
    if (user) {
      const response = new NextResponse(
        JSON.stringify({
          status: 200,
          user,
        })
      );
      return response;
    } else {
      return new NextResponse("No User Found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}