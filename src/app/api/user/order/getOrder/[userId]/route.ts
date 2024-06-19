import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  try {
    //const userId = req.nextUrl.searchParams.get("userId");
    const userId = context.params.userId;
    if (userId === null) {
      return new NextResponse("userId parameter is missing", { status: 400 });
    }
    const order = await prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (order) {
      return NextResponse.json(order);
    } else {
      return new NextResponse("Order not found", { status: 200 });
    }
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal bhul", { status: 403 });
  }
}