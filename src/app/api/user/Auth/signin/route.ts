import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { signinInput } from "@/schemas/signinInput"
import { sign } from 'jsonwebtoken';
export default async function POST(req:Request){

    const prisma = new PrismaClient({
            datasources: {
              db: {
                url: process.env.DATABASE_URL, // Assuming you have this environment variable set
              },
            },
     });

    const body = await req.json();
        const { success } = signinInput.safeParse(body);
        if (!success) {
          return Response.json(
            { 
                message: 'Inputs not correct'
            },
            { status: 400 }
        );
    }
    
      try {
        const user = await prisma.user.findFirst({
            where:{
              email: body.email,
              password: body.password,
            },
        })
        if(!user){
           return Response.json(
            { 
                message:"Invalid"
            },
            { status: 403 }
          );
        }

        const jwt = await sign({
            id: user.id
          },prisma.env.JWT_SECRET);
        
        return Response.json(
            { 
                jwt
            }
          );
        
      } catch (e) {
        return Response.json(
            { 
                message:"Invalid"
            },
            { status: 411 }
          );
      }
}