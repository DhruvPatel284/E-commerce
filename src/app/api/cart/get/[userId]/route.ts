import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
) {
    const body = await req.json();
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: body.userId,
      },
    });

    let newCart = {
      id: cart?.id,
      products: cart?.products,
    };

    if (cart) {
      return NextResponse.json(newCart);
    } else {
      return new NextResponse("Cart not found", { status: 200 });
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}