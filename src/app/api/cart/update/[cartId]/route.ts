import prisma from "@/lib/prismadb";
import { NextResponse ,NextRequest} from "next/server";

export async function POST(
  req: NextRequest,
) {
  const cartId = req.nextUrl.searchParams.get("cartId");
  if (cartId === null) {
    return new NextResponse("CartId parameter is missing", { status: 400 });
  }
  const body = await req.json();
  try {
    const cart = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: body,
    });

    if (cart) {
      return NextResponse.json(cart);
    } else {
      return new NextResponse("Cart not found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}