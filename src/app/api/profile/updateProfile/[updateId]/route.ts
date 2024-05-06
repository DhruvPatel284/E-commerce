import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PUT(
  req: Request,
  context: { params: { updateId: string } }
) {
  try {
    const body = await req.json();
    const temp = context.params.updateId;
    console.log(temp);
    await prisma.user.update({
      where: { id: context.params.updateId },
      data: body,
    });
    return new NextResponse(
      JSON.stringify({
        message: "Successfully Updated",
      })
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}