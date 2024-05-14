import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
) {
    const body = await req.json();
  try {
    await prisma.cart.delete({
      where: {
        id: body.cartId,
      },
    });
    return new NextResponse("Cart Cleared", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}