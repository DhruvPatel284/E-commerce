// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// export async function GET(req: Request) {
//   try {
//     const response = new NextResponse("Logout successful");
//     cookies().delete("token");
//     return response;
//   } catch (error) {
//     console.log(error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Create a new response object
    const response = NextResponse.json({ message: "Logout successful" });

    // Delete the "token" cookie
    response.cookies.set("token", "", { expires: new Date(0) });

    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
