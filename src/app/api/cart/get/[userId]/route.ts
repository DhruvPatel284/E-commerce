import prisma from "@/lib/prismadb";
import { NextResponse,NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (userId === null) {
    return new NextResponse("CartId parameter is missing", { status: 400 });
  }
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
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