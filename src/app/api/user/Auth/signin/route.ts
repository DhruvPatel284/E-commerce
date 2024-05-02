import { NextResponse } from "next/server";
import { signinInput } from "@/schemas/signinInput"
import { sign } from 'jsonwebtoken';
import jwt from "jsonwebtoken";
import  prisma  from "@/lib/prismadb"
var bcrypt = require("bcryptjs");

export  async function POST(req:Request){
    const body = await req.json();
    const { email, password } = body; 
    const { success } = signinInput.safeParse(body);
     if (!success) {
          return NextResponse.json(
            { 
                message: 'Inputs not correct'
            },
            { status: 400 }
        );
    }
    
      try {
        
        const user = await prisma.user.findUnique({
          where: { email },
        });
    
        if(!user){
           return NextResponse.json(
            { 
                message:"Invalid"
            },
            { status: 403 }
          );
        }

        const passwordMatching = await bcrypt.compare(password, user.password);

        if (!passwordMatching) {
          return new NextResponse("Invalid credentials", { status: 401 });
        }

        const token = jwt.sign(
          { userId: user.id, username: user.username, email: user.email },
          process.env.JWT_SECRET || "",
          {
            expiresIn: "24h",
          }
        );
      
        const modifiedUser = { name: user.username, email: user.email, id: user.id };

        const response = new NextResponse(
          JSON.stringify({
            message: "Successfully logged in",
            user: { ...modifiedUser },
          })
        );
    
        response.headers.set(
          "Set-Cookie",
          `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
        );
    
        return response;
          
        
      } catch (e) {
        return NextResponse.json(
            { 
                message:"Invalid"
            },
            { status: 411 }
          );
      }
}