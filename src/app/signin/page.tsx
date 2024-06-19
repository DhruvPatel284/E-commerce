"use client"

import Quote from "@/components/auth/Quote";
import Signin from "@/components/auth/Signin";


export default function signin(){
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Signin />
            </div>
            <div className="hidden lg:block">
              <Quote />
            </div>
        </div>
    </div>
  )
}
//export default signin;