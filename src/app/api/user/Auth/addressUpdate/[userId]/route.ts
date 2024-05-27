import prisma from "@/lib/prismadb";
import { NextResponse,NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
) {
    const { address, pincode, state, city, country } = await req.json();
  const userId = req.nextUrl.searchParams.get("userId");
  if (userId === null) {
    return new NextResponse("CartId parameter is missing", { status: 400 });
  }
  
  try {
    const user = await prisma.user.update({
        where: { id: userId },
        data: {
          address: {
            upsert: {
              create: {
                address,
                pincode,
                state,
                city,
                country,
              },
              update: {
                address,
                pincode,
                state,
                city,
                country,
              },
            },
          },
        },
        include: { address: true },
      });
      return new NextResponse(JSON.stringify(user), { status: 200 });
    
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}