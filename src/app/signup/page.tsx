"use client"

import Quote from "@/components/auth/Quote";
import Signup from "@/components/auth/Signup";

const signup = () => {
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Signup />
            </div>
            <div className="hidden lg:block">
              <Quote />
            </div>
        </div>
    </div>
  )
}
export default signup;