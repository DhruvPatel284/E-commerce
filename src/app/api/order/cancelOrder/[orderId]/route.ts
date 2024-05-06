import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: { orderId: string } }
) {
  try {
    const { body } = await req.json();
    const order = await prisma.order.delete({
      where: { id: context.params.orderId },
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