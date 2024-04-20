import { NextResponse } from "next/server";
import { signupInput } from "@/schemas/signupInput"
import { PrismaClient } from '@prisma/client';

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

    const { success } = signupInput.safeParse(body);
    if (!success) {
      return Response.json(
        { 
            message: 'Inputs not correct'
        },
        { status: 400 }
    );
    }
      try {
        const user = await prisma.user.create({
          data: {
            email: body.email,
            password: body.password,
            username: body.username,
          },
        });
    
        const jwt = await sign({ id: user.id }, process.env.JWT_SECRET);
        return Response.json(
            { 
                jwt
            },
            { status: 200 }
        );
        
      } catch(e){
        return Response.json(
            { 
                message:"You are not logged in"
            },
            { status: 403 }
        );
      }

}