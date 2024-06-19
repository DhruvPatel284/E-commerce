import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
) {
  const cartId = req.nextUrl.searchParams.get("cartId");
  if( ! cartId ) {
    return new NextResponse("Params Cart Id missing:" , { status : 400 });
  }
  try {
    await prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
    return new NextResponse("Cart Cleared", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}