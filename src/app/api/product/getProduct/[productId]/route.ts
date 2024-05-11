import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
export async function POST(
    req : Request,
) {
    try{
        const body = await req.json();
        const product = await prisma.product.findFirst({
            where:{
                id : body.productId
            }
        });
        if( product ){
            return NextResponse.json(product)
        }else{
            return new NextResponse("product Not Found" , { status : 404 });
        }
    }catch(e){
        console.log(e);
        return new NextResponse("Internal error " , {  status : 500});
    }
    
}