import { NextResponse } from "next/server";
import { signupInput } from "@/schemas/signupInput"
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";
var bcrypt = require("bcryptjs");

export  async function POST(req:Request){
    const body = await req.json();
    const { email, password, username } = body;
    console.log(email)
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              username,
              email,
              password: hashedPassword,
            },
          });
    
        const token = jwt.sign(
          { userId: newUser.id, username: newUser.username, email: newUser.email }, 
          process.env.JWT_SECRET || "",
          {
            expiresIn: "1d",
          }
        );

        const response = new NextResponse(
          JSON.stringify({
            message: "Successfully Account Created",
            id: newUser.id,
          }),{status:200}
        );
  
        response.headers.set(
          "Set-Cookie",
          `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
        );
        return response;
      }else{
        return new NextResponse("User Already Exists", { status: 403 });
      }
        
      } catch(e){
        console.log(e);
        return Response.json(
            { 
              message:"Internal Error"
            },
            { status: 500  }
        );
      }

}


