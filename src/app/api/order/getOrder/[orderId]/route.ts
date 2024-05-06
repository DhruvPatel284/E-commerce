import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { orderid: string } }
) {
  try {
    let temp = req.nextUrl.searchParams.get("orderid");
    if(!temp)return new NextResponse("som went eornh");

    const order = await prismadb.order.findFirst({
      where: {
        id:temp ,
      },
    });
    console.log(order);
    if (order) {
      return NextResponse.json({
        order
      });
    } else {
      return new NextResponse("Order not found", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}