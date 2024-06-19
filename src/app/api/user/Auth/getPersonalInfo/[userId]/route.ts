import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  //const userId = req.nextUrl.searchParams.get("userId");
  const userId = context.params.userId;
  if (userId === null) {
    return new NextResponse("CartId parameter is missing", { status: 400 });
  }
  try {
    const data = await prisma.user.findUnique({
        where: {
            id : userId
        }
    }) 
    const response = new NextResponse(
        JSON.stringify({
          message: "Verified User",
          user: data,
        }),
        {status:200}
    );
    
    return response;

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}