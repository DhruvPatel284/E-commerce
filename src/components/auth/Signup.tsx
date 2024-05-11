"use client"
import { ChangeEvent, useEffect, useState } from "react";
import {  useRouter } from 'next/navigation'
import  axios  from "axios";
import Link from "next/link";
import { send } from "process";
import { sendResponse } from "next/dist/server/image-optimizer";
import { SignupInput } from "@/schemas/signupInput"


// export const Signup = () =>{
//     const navigate = useRouter();
//     const [postInputs,setPostInputs] = useState<SignupInput>({
//         email:"",
//         username:"",
//         password:"" , 
//     })
 
//        const sendRequest = async()=>{
//          try {
//               console.log(postInputs);
//               const response = await axios.post("/api/user/auth/signup",postInputs);
//               console.log(response);
//               if(response)
//                 navigate.push("/");
             
//          } catch (error) {
//             console.log(error);
//             alert("error while sign up");
//          }
//        }

    
//     return <div className="h-screen flex justify-center flex-col">
//          <div className="flex justify-center">
//             <div>
//                  <div className="px-10">
//                     <div className="text-3xl font-extrabold">
//                         Create an account
//                     </div>
//                     <div className="text-slate-500 mt-3">
//                         Already have an account?
//                         <Link href = "/signin"  className="pl-2 underline" >
//                             Sign in
//                         </Link>
//                     </div>
//                 </div>
//                 <div className="pt-2">
//                         <LabelledInput label="Username" placeholder="dhruv...." onChange={(e) => {
//                         setPostInputs({
//                             ...postInputs,
//                             username: e.target.value
//                         })
//                         }}  />
//                         <LabelledInput label="Email" placeholder="dhruv@gmail.com" onChange={(e) => {
//                         setPostInputs({
//                             ...postInputs,
//                             email: e.target.value
//                         })
//                         }} />
//                         <LabelledInput label="password" type={"password"} placeholder="123456"onChange={(e) => {
//                         setPostInputs({
//                             ...postInputs,
//                             password: e.target.value
//                         })
//                         }} />
//                         <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
//                         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
//                          dark:focus:ring-gray-700 dark:border-gray-700">Sign up</button>
//                 </div>
//               </div>
//          </div>
//     </div>
// }

// interface LabelledInputType{
//     label:string;
//     placeholder:string;
//     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//     type?: string;
// }

// function LabelledInput({ label,placeholder,onChange,type } : LabelledInputType){
//      return <div>
//         <div>
//             <label className="block mb-2 text-sm  text-black font-bold pt-2 "> {label} </label>
//             <input type={type || "text"} id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
//              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
//         </div>
//      </div>
// }
// export default Signup;


export const Signup = () =>{
    const navigate = useRouter();
    const [ inputs , setInputs ] = useState<{username ?: string , email : string , password : string}>({
        username : "",
        email : "",
        password : ""
    })
    async function sendRequest(){
        
        try{
            console.log(inputs)
            const response = await axios.post("http://localhost:3000/api/user/auth/signup",inputs);
            console.log(response);
            navigate.push("/");
        }
        catch(e){
            console.log(e);
            alert("error while signup");
        }
    }
    return <div className="h-screen flex justify-center flex-col">
         <div className="flex justify-center">
            <div>
                 <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-500 mt-3">
                        Already have an account?
                        <Link href = "/signin"  className="pl-2 underline" >
                            Sign in
                        </Link>
                    </div>
                </div>
                <div className="pt-2">
                            <div>
                                <label className="block mb-2 text-sm  text-black font-bold pt-2 ">Username</label>
                                <input onChange={(e) => {
                                    setInputs({
                                        ...inputs,
                                        username : e.target.value
                                    })
                                }} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="john wick" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm  text-black font-bold pt-2 ">Email</label>
                                <input onChange={(e) => {
                                    setInputs({
                                        ...inputs,
                                        email : e.target.value
                                    })
                                }} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="kunjdave694@gmail.com" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm  text-black font-bold pt-2 ">Password</label>
                                <input onChange={(e) => {
                                    setInputs({
                                        ...inputs,
                                        password : e.target.value
                                    })
                                }} type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="123456" required />
                            </div>
                        <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                         dark:focus:ring-gray-700 dark:border-gray-700">Sign up</button>
                </div>
              </div>
         </div>
    </div>
}

export default Signup;