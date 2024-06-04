
"use client"
import axios from "axios";
import { Activity, ActivityIcon, ActivitySquareIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../productFinalLook/ProductFinalCard";
import { Skeleton } from "../ui/skeleton";
import toast from "react-hot-toast";
import { OrderProduct } from "@/redux/types";
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setOrderData, setUserData } from "@/redux/actions";
import { Cart, CartProduct, InitialState, Order, Product } from "@/redux/types"

//   interface order{
//     id:string;
//     userId:string;
//     products:OrderProduct[];
//     status:OrderStatus;
//   }
//   enum OrderStatus{
//     Pending,
//     Delivered,
//     cancelled
//   }

const OrderPage = () => {
    const [ orders , setOrders ] = useState<Order[]>([]); 
    const [ loading , setloading ] = useState<boolean>(true);
    const userData = useSelector((state : InitialState) => state.userData);
    const route = useRouter();
    const orderData = useSelector((state : InitialState ) => state.orders); 
    const dispatch = useDispatch();
    useEffect(() => {
        const FetchProduct = async () => {
          try{
            if(userData.id){
                const OrderResponse = await axios.post(`api/order/getOrder/?userId=${userData.id}`);
                console.log("order response:",OrderResponse?.data)
                dispatch(setOrderData(OrderResponse?.data));
                setOrders(OrderResponse?.data);
                setloading(false);
            }
          }
          catch(e){
            
          }
        }
        FetchProduct();
      }, [userData.id])
  return (
    <div>
            <div className='bg-slate-200'>
                <div className="text-xl md:text-3xl font-bold text-slate-800 flex justify-center
                h-[70px] items-center">
                    My Orders
                </div>   
            <div className="min-w-[1000px] max-w-[1100px]  h-full m-auto pt-4 bg-slate">
            {
                orders &&
                orders.map((order:Order,orderIndex:number)=>(
                    <div key={orderIndex} className="order">
                    {
                        order.products.map((product:OrderProduct,productIndex:number)=>(
                            <div key={productIndex} onClick={() => {
                                route.push(`/order/[orderId]/${order.id}`);
                              }} className="product">
                                      <div className="h-[250px] grid grid-cols-12  mt-[2px]  ">
                                    <div className="col-span-3 p-4 bg-white hover:bg-slate-50 trasition-all " onClick={()=>{route.push(`/order/[orderId]/?${order.id}`)}}>
                                        <img
                                        className="m-auto max-h-[200px] hover:scale-110 transition-all"
                                        src={product.image}
                                        alt="Search result product"
                                        />
                                    </div>
                                    <div className="col-span-9 bg-white border border-white hover:bg-gray-50 ">
                                        <div className="font-medium text-black mt-4">
                                        <div className="mb-1">
                                        <div className="text-xl xl:text-2xl mb-1 font-semibold text-slate-800">
                                            {product.product_name}
                                        </div>
                                        </div>
                                        <div className="text-xl xl:text-2xl text-red-600 font-semibold mt-2">
                                            Rs.{product.price}
                                        </div>
                                        </div>
                                
                                       
                                    
                                    </div>
                                    </div>
                                    <div className='bg-slate-200 h-[20px]'>

                                    </div>


                        {/* // dhruvcdskjbkjcbkjcdscjdscdkjckjcdjd */}
                            </div>
                            
                        ))
                    }
                    </div>
                ))
            }
        </div>



        {
            loading && 
            <div className='h-[550px]'>
            <div className='flex justify-center'>
                <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-2 w-[80%]">
                    <Skeleton className='col-span-3 mr-5 h-[250px]'>
                        <Skeleton className=''/>
                    </Skeleton>
                    <Skeleton className='col-span-9  h-[250px]'>
                        <Skeleton/>
                    </Skeleton>
                </div>
            </div>
            <div className='flex justify-center mt-2'>
                <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-2 w-[80%]">
                    <Skeleton className='col-span-3 mr-5 h-[250px]'>
                        <Skeleton className=''/>
                    </Skeleton>
                    <Skeleton className='col-span-9  h-[250px]'>
                        <Skeleton/>
                    </Skeleton>
                </div>
            </div>
            </div>
        }
        </div>
    </div>
  )
}

export default OrderPage;



// return (
//     <div key={key}>
        // <div className="h-[250px] grid grid-cols-12  mt-[2px]  ">
        // <div className="col-span-3 p-4 bg-white hover:bg-slate-50 trasition-all " onClick={()=>{route.push(`/order/[orderId]/?${order.id}`)}}>
        //     <img
        //     className="m-auto max-h-[200px] hover:scale-110 transition-all"
        //     src={order.products.image}
        //     alt="Search result product"
        //     />
        // </div>
        // <div className="col-span-9 bg-white border border-white hover:bg-gray-50 ">
        //     <div className="font-medium text-black mt-4">
        //     <div className="mb-1">
        //     <div className="text-xl xl:text-2xl mb-1 font-semibold text-slate-800">
        //         {order.products.product_name}
        //     </div>
        //     </div>
        //     <div className="text-xl xl:text-2xl text-red-600 font-semibold mt-2">
        //         Rs.{order.products.price}
        //     </div>
        //     </div>
    
        //     <div className="bg-slate-800 w-[15%] h-10 hover:bg-slate-500 text-white font-bold py-2 px-4 border border-black-500 rounded-md mt-3">
        //         {order.status}
        //     </div>
        
        // </div>
        // </div>
        // <div className='bg-slate-200 h-[20px]'>

        // </div>
//     </div>
//     );