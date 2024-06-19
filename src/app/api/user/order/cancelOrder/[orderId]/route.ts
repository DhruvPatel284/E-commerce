import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { orderId: string } }
) {
  try {
   // const orderId = req.nextUrl.searchParams.get("orderId");
   const orderId = context.params.orderId
    if (orderId === null) {
      return new NextResponse("orderId parameter is missing", { status: 400 });
    }
    const order = await prisma.order.delete({
      where: { id: orderId },
    });
    
    if (order) {
      return NextResponse.json("order cancelled successfully !!",{ status: 200});
    } else {
      return new NextResponse("Order not found", { status: 401 });
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}