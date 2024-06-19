"use client"
import { isAuthenticated } from "./productFinalLook/ProductFinalCard";
import { Activity } from "lucide-react";
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast"; // Ensure to import Toaster
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setOrderData, setUserData } from "@/redux/actions";
import { Cart, CartProduct, InitialState, Order } from "@/redux/types"
import { Separator } from "@/components/ui/separator";
import * as z from "zod"; // Corrected import
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/textarea";
import Appbar from "./Appbar";
import { Skeleton } from "./ui/skeleton";
interface User {
  id : string;
  email : string;
  phoneno ?: string;
  username ?: string;
  address?: string;   
  pincode?: number;   
  state?: string;     
  city?: string;      
  country?: string;
}
const ProfilePage = () => {
  const cartData = useSelector((state : InitialState ) => state.cart)
  const userData = useSelector((state : InitialState) => state.userData)
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User>({
    id : "",
    email : "",
    phoneno : "",
    username : "",
    address : "",   
    pincode: 0,   
    state: "",     
    city: "",      
    country: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        // const response = await isAuthenticated();
        // if (!response || response.status !== 200) {
        //   return;
        // }
        const userId = userData.id;
        console.log(userId);
        const res = await axios.get(`api/user/Auth/getPersonalInfo/${userId}`);

        setUserInfo(res.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error while fetching user', error);
      }
    };
    getUserData();
  }, []);
  const formSchema = z.object({
    username: z.string().nonempty(),
    phoneno: z.string().nonempty(),
    address: z.string().nonempty(),
    city: z.string().nonempty(),
    pincode: z.coerce.number(),
    state: z.string().nonempty(),
    country: z.string().nonempty(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue("username", userInfo.username ? userInfo.username : "");
    form.setValue("phoneno", userInfo.phoneno ? userInfo.phoneno : "");
    form.setValue("address", userInfo.address ? userInfo.address : "");
    form.setValue("city", userInfo.city ? userInfo.city : "");
    form.setValue("pincode", userInfo.pincode ? userInfo.pincode : 0);
    form.setValue("country", userInfo.country ? userInfo.country : "");
    form.setValue("state", userInfo.state ? userInfo.state : "");
  }, [userInfo, form]);

  const updateAddressHandler = async (values: z.infer<typeof formSchema>) => {
      try {
        toast.loading("Updating Profile");
        const response = await axios.post(`/api/user/Auth/updateuser/${userInfo.id}` , values );
        toast.dismiss();
        toast.success("Profile Updated"); 
      } catch (error : any) {
        toast.dismiss();
        toast.error(error.message);
      }
  };
  

  return (
    <div>
      <div> 
          <main className="flex w-full justify-center items-center">
          {!loading && (
            <section className="md:container w-[90%] md:w-[80%] my-10">
              <h2 className="font-bold text-blue-700 text-xl md:text-3xl flex justify-center items-center">
                <Activity className="mr-2" />
                My Profile
              </h2>
              <div className="mt-8 h-[1px] bg-slate-900"/>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(updateAddressHandler)}>
                  <p className="font-medium  mt-3 mb-3 text-blue-700 text-base md:text-lg flex justify-center">
                    Personal Details
                  </p>
                  <Separator className="mb-4 mt-2" />
                  <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800 text-sm md:text-base">
                            Full Name
                          </FormLabel>
                          <FormControl className=" text-slate-800 bg-slate-100">
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneno"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800 text-sm md:text-base">
                            Phone Number
                          </FormLabel>
                          <FormControl className="text-slate-800 bg-slate-100">
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-8 h-[1px] bg-slate-900"/>
                  <p className="flex justify-center text-blue-700 font-medium mt-3 mb-3 text-base md:text-lg">
                    Location Details
                  </p>
                  <Separator className="mb-4 mt-2" />
                  <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800 text-sm md:text-base">
                            Country
                          </FormLabel>
                          <FormControl className="text-slate-800 bg-slate-100">
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800 text-sm md:text-base">
                            State
                          </FormLabel>
                          <FormControl className="text-slate-800 bg-slate-100">
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800 text-sm md:text-base">
                            City
                          </FormLabel>
                          <FormControl className="text-slate-800 bg-slate-100">
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800 text-sm md:text-base">
                            Pincode
                          </FormLabel>
                          <FormControl className="text-slate-800 bg-slate-100">
                            <Input {...field} type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800 text-sm md:text-base">
                            Address
                          </FormLabel>
                          <FormControl className="text-slate-800 bg-slate-100">
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <Button type="submit" className="mt-10">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </section>
          )}
          {loading && (
            <div className="min-h-[590px]">
              <Skeleton className="h-[100px] w-[1000px] flex justify-center mt-3 bg-slate-400 items-center "/>
              <Skeleton className="h-[100px] w-[1000px] flex justify-center mt-3 bg-slate-400 items-center "/>
              <Skeleton className="h-[100px] w-[1000px] flex justify-center mt-3 bg-slate-400 items-center "/>
              <Skeleton className="h-[100px] w-[1000px] flex justify-center mt-3 bg-slate-400 items-center "/>
              <Skeleton className="h-[100px] w-[1000px] flex justify-center mt-3 bg-slate-400 items-center "/>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;