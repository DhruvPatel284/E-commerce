"use client"
import { ChangeEvent, useState } from "react";
import {  useRouter } from 'next/navigation'
import  axios  from "axios";
import Link from "next/link";


export const Signin = () =>{
    const navigate = useRouter();
    const [ inputs , setInputs ] = useState<{email : string , password : string}>({
        email : "",
        password : ""
    })
    async function sendRequest(){
        try{
            const response = await axios.post("api/user/auth/signin", inputs);
            const token =  response.data;
            //console.log(response.data);
            navigate.push("/");
        }catch(e){
            alert( " error while signin  ");
        }
    }

    return <div className="h-[700px] flex justify-center flex-col">
         <div className="flex justify-center">
            <div>
                 <div className="px-10">
                    <div className="text-3xl font-extrabold text-center">
                        Login
                    </div>
                    <div className="text-slate-500 mt-3 ">
                        Don't have an account?
                        <Link href = "/signup"  className="pl-2 underline" >
                            Sign up
                        </Link>
                    </div>
                </div>
                <div className="pt-2">
                        <div>
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
                        </div>
                        <div>
                            <div>
                                <label className="block mb-2 text-sm  text-black font-bold pt-2 ">password</label>
                                <input 
                                onChange={(e) => {
                                    setInputs({
                                        ...inputs,
                                        password : e.target.value
                                    })
                                }} type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="123456" required />
                            </div>
                        </div>
                        <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                         dark:focus:ring-gray-700 dark:border-gray-700">Login</button>

                </div>
              </div>
         </div>
    </div>
}
export default Signin;