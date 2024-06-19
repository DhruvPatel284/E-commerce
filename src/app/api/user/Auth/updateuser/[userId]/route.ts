import prisma from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
     req: NextRequest,
    context: { params: { userId: string } }
 ) {
    const body = await req.json();
    //const userId = req.nextUrl.searchParams.get("userId");
    const userId = context.params.userId
    if (userId === null) {
        return new NextResponse("CartId parameter is missing", { status: 400 });
    }
    try{
        const response = await prisma.user.update({
            where: 
            {
                id: userId,
            },
            data:body
        })
        if( !response ){
            new NextResponse("User Not Exist :" , {status : 400});
        }
        return new NextResponse("User Updated :" , {status : 200});
    }
    catch(e){
        console.log(e);
        return new NextResponse("error:" , {status : 500}) 
    }
}