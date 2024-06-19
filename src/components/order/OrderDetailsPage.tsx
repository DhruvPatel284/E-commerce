
"use client"

import dateFormaterHandler from "@/lib/DateFormatter";
import { InitialState, Order, OrderProduct, Product } from "@/redux/types";
import axios from "axios";
import { reverse } from "dns";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { date, set } from "zod";
import { Skeleton } from "../ui/skeleton";



const OrderDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [ order , setOrder ] = useState<Order>({
    id: "",
    userId: "",
    status: "Pending",
    total: 0,
    products: [],
    createdAt:  new Date(),
    updatedAt: new Date()
  });
  const orderData = useSelector((state: InitialState) => state.orders);
  const param = useParams();
  const router = useRouter();
  const userData = useSelector((state: InitialState) => state.userData);
  useEffect(() => {
    const DateFormater = async () => {
      try{
        const res = await axios.post(`/api/user/order/getOrderByOrderId/?orderId=${param.orderId}`);
        setOrder(res.data);
        setLoading(false);
      }
      catch(e){
        toast.error("Failed to fetch order details");
      }
    } 
    userData && DateFormater();
  },[userData])
  
  let formatteDate = order.createdAt.toString().slice(0 , 10 );

  if( loading ){
    return <div className=" flex justify-center flex-col m-auto items-center mt-[100px]">
      <Skeleton className="bg-slate-300 w-[800px] h-[200px] "/>
      <Skeleton className="bg-slate-300 w-[800px] mt-10 h-[200px] "/>
    </div>
  }
  else{

  return (
    <section className="w-full h-[90vh] flex justify-center items-center">
      {!loading &&  (
        <section className="mx-auto py-8 md:container w-[90%] md:w-[75%] md:min-h-[50vh] rounded-md border-slate-800 border-2 px-4 flex flex-col gap-8">
           <div  className="flex justify-evenly items-center flex-col-reverse md:flex-row">
              <div>
                <p className="bg-[#272e3f] inline-block text-white px-2 py-1 mb-2 text-xs font-medium rounded tracking-wider">
                  {order.status}
                </p>
                <p className="my-3 text-slate-700">
                  Your order has been placed and will soon reach to you!
                </p>
                <div className="w-full flex justify-start items-start mt-6 mb-4 border-b pb-2">
                  <p className="w-3/4 font-semibold text-sm md:text-base">
                    Product
                  </p>
                  <p className="w-1/4 font-semibold text-sm md:text-base">Total</p>
                </div>
                {order && order.products.map((item: OrderProduct) => (
                  <div key={item.id} className="w-full flex justify-start items-start my-2">
                    <p className="w-3/4 cursor-pointer text-xs md:text-sm">
                      <div>
                        {item.product_name}
                      </div>
                    </p>
                    <p className="w-1/4 text-xs md:text-sm">
                      {item.quantity} x ₹{item.price}
                    </p>
                  </div>
                ))}
                <div className="w-full flex justify-start items-start mt-4 mb-4">
                  <p className="w-3/4 font-semibold text-sm md:text-base">
                    Subtotal
                  </p>
                  <p className="w-1/4 font-semibold text-sm md:text-base">
                    {order.total}
                  </p>
                </div>
                <p className="mt-6 mb-2 text-sm md:text-base font-semibold">
                  <span className="font-semibold">Order Placed :</span>{"  "}
                  {formatteDate}
                </p>
              </div>
              <div className="flex justify-center items-center mb-8 md:mb-0">
                <img
                  src="../images/deliveryTruck.png"
                  alt="Delivery Truck"
                  width={400}
                  height={300}
                />
              </div>
            </div>
          
        </section>
      )}
    </section>
  );
};
}

export default OrderDetailsPage;
