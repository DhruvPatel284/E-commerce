
// "use client"
// import axios from "axios";
// import { Activity, ActivityIcon, ActivitySquareIcon } from "lucide-react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { isAuthenticated } from "../productFinalLook/ProductFinalCard";
// import { Skeleton } from "../ui/skeleton";
// import toast from "react-hot-toast";
// import { OrderProduct } from "@/redux/types";
// import { useDispatch, useSelector } from "react-redux";
// import { setCartData, setOrderData, setUserData } from "@/redux/actions";
// import { Cart, CartProduct, InitialState, Order, Product } from "@/redux/types"

// //   interface order{
// //     id:string;
// //     userId:string;
// //     products:OrderProduct[];
// //     status:OrderStatus;
// //   }
//   enum OrderStatus{
//     Pending,
//     Delivered,
//     cancelled
//   }

// const OrderPage = () => {
//     const [ orders , setOrders ] = useState<Order[]>([]); 
//     const [ loading , setloading ] = useState<boolean>(true);
//     const dispatch = useDispatch();
//     const userData = useSelector((state : InitialState) => state.userData);
//     const route = useRouter();
//     const orderData = useSelector((state : InitialState ) => state.orders); 
//     useEffect(() => {
//         const FetchProduct = async () => {
//           try{
//             if(userData.id){
//                 const OrderResponse = await axios.post(`api/user/order/getOrder/${userData.id}`);
//                 setOrders(OrderResponse.data);
//                 setloading(false);
//             }
//           }
//           catch(e){
            
//           }
//         }
//         FetchProduct();
//       }, [userData])

//       if(loading){
//         return <div className='h-[590px] '>
//         <div className='flex justify-center'>
//             <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-2 w-[80%]">
//                 <Skeleton className='col-span-3 mr-5 h-[250px]'>
//                     <Skeleton className=''/>
//                 </Skeleton>
//                 <Skeleton className='col-span-9  h-[250px]'>
//                     <Skeleton/>
//                 </Skeleton>
//             </div>
//         </div>
//         <div className='flex justify-center mt-2'>
//             <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-2 w-[80%]">
//                 <Skeleton className='col-span-3 mr-5 h-[250px]'>
//                     <Skeleton className=''/>
//                 </Skeleton>
//                 <Skeleton className='col-span-9  h-[250px]'>
//                     <Skeleton/>
//                 </Skeleton>
//             </div>
//         </div>
//         </div>
//       }
//     else{
//   return (
//     <div className="min-h-[590px] bg-slate-100">
//             { orders.length == 0 && 
//                 (<div className="h-full w-full flex flex-col justify-center items-center bg-white">
//                     <div className="text-xl md:text-3xl text-purple-800 font-semibold mt-5">
//                         Order Is Empty
//                     </div>
//                     <div className="h-full">
//                         <img  src="../images/cartempty.png" alt="" />
//                     </div>
//                 </div>)
//              }{ orders.length != 0 && <div className='bg-slate-100'>
//                 <div className="text-xl md:text-3xl font-bold text-slate-800 flex justify-center
//                 h-[70px] items-center">
//                     My Orders
//                 </div>   
//             <div className="min-w-[1000px] max-w-[1100px]  h-full ml-auto mr-auto">
//             {
//                 orders &&
//                 orders.map((order:Order,orderIndex:number) => (
//                     <div key={orderIndex} className="order mt-[50px] border-slate-400 border-y border-x-2 border-t-2  bg-white rounded-xl shadow-xl">
//                     {
//                         order.products.map((product:OrderProduct) => (
//                             <div key={product.id} className="product ">
//                                       <div onClick={() => {
                                        
//                                         route.push(`order/${order.id}`);
//                                       }} className=" grid grid-cols-12   cursor-pointer">
//                                     <div className="col-span-3 p-4 ">
//                                         <img
//                                         className="m-auto max-h-[200px] hover:scale-105 transition-all"
//                                         src={product.image}
//                                         alt="Search result product"
//                                         />
//                                     </div>
//                                     <div className="col-span-9">
//                                         <div className="font-medium text-black mt-4">
//                                         <div className="mb-1">
//                                         <div className="text-xl xl:text-2xl flex justify-between mb-1 :first-letter:first-line:marker:selection:file:font-semibold text-slate-800">
//                                             <div>
//                                                 {product.product_name}
//                                             </div>
//                                             <div className="text-md md:text-xl mr-4">
//                                                 Quantity :- {product.quantity}
//                                             </div>
//                                         </div>
//                                         </div>
//                                         <div className="text-xl xl:text-2xl text-red-600 font-semibold mt-2">
//                                             Rs.{product.price}
//                                         </div>
//                                         </div>
//                                     </div>
//                                     </div>
//                                     <div className="h-[1px] bg-slate-500 w-[1081px] ml-auto mr-auto">

//                                     </div>
//                             </div>
                            
//                         ))
//                     }
//                     </div>
//                 ))
//             }
//             <div className="h-[50px]">

//             </div>
//         </div>
//         </div>}
//     </div>
//   )
// }
// }
// export default OrderPage;



// // return (
// //     <div key={key}>
//         // <div className="h-[250px] grid grid-cols-12  mt-[2px]  ">
//         // <div className="col-span-3 p-4 bg-white hover:bg-slate-50 trasition-all " onClick={()=>{route.push(`/order/[orderId]/?${order.id}`)}}>
//         //     <img
//         //     className="m-auto max-h-[200px] hover:scale-110 transition-all"
//         //     src={order.products.image}
//         //     alt="Search result product"
//         //     />
//         // </div>
//         // <div className="col-span-9 bg-white border border-white hover:bg-gray-50 ">
//         //     <div className="font-medium text-black mt-4">
//         //     <div className="mb-1">
//         //     <div className="text-xl xl:text-2xl mb-1 font-semibold text-slate-800">
//         //         {order.products.product_name}
//         //     </div>
//         //     </div>
//         //     <div className="text-xl xl:text-2xl text-red-600 font-semibold mt-2">
//         //         Rs.{order.products.price}
//         //     </div>
//         //     </div>
    
//         //     <div className="bg-slate-800 w-[15%] h-10 hover:bg-slate-500 text-white font-bold py-2 px-4 border border-black-500 rounded-md mt-3">
//         //         {order.status}
//         //     </div>
        
//         // </div>
//         // </div>
//         // <div className='bg-slate-200 h-[20px]'>

//         // </div>
// //     </div>
// //     );
// // "use client"
// // import axios from "axios";
// // import { Activity, ActivityIcon, ActivitySquareIcon } from "lucide-react";
// // import Link from "next/link";
// // import { useParams } from "next/navigation";
// // import { useRouter } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import { isAuthenticated } from "../productFinalLook/ProductFinalCard";
// // import { Skeleton } from "../ui/skeleton";
// // import toast from "react-hot-toast";
// // import { OrderProduct } from "@/redux/types";
// // interface Product {
// //     product_name: string;
// //     product_description: string;
// //     price: number;
// //     image: string;
// //     id: string;
// //     category: string;
// //     stock : number;
// //     quantity : number;
// //   }

// //   interface order{
// //     id:string;
// //     userId:string;
// //     products:OrderProduct;
// //     status:OrderStatus;
// //   }
// //   enum OrderStatus{
// //     Pending,
// //     Delivered,
// //     cancelled
// //   }

// // const OrderPage = () => {
// //     const [ orders , setOrders ] = useState<order[]>([]); 
// //     const route = useRouter();
// //     const [ loading , setloading ] = useState<boolean>(true);
// //     useEffect(() => {
// //         const FetchProduct = async () => {
// //           try{
// //             const response = await isAuthenticated();
// //             if (!response || response.status !== 200) {
// //               return;
// //             }
// //             const userId = response.data.user.userId;
// //             const res = await axios.post(`/api/user/order/getOrder/?userId=${userId}`);
// //             setOrders(res?.data);
// //             setloading(false);
// //           }
// //           catch(e){
            
// //           }
// //         }
// //         FetchProduct();
// //       }, [])
// //   return (
// //     <div>
// //             <div className='bg-slate-200'>
// //                 <div className="text-xl md:text-3xl font-bold text-slate-800 flex justify-center
// //                 h-[70px] items-center">
// //                     <ActivityIcon className="mr-2 text-red-500"/>
// //                     My Orders
// //                 </div>   
// //             <div className="min-w-[800px] max-w-[900px]   m-auto  bg-slate ">
// //             {orders &&
// //             orders.map((order:order, key) => {
// //                 return (
// //                 <div key={key} onClick={() => {
// //                     route.push(`/order/${order.id}`);
// //                 }}>
// //                     <div className="h-[250px] grid grid-cols-12  mt-[10px] cursor-pointer ">
// //                     <div className="col-span-3 p-4 bg-white hover:bg-slate-50 trasition-all">
// //                         <img
// //                         className="m-auto max-h-[200px] hover:scale-110 transition-all"
// //                         src={order.products.image}
// //                         alt="Search result product"
// //                         />
// //                     </div>
// //                     <div className="col-span-9 bg-white border border-white hover:bg-gray-50 ">
// //                         <div className="font-medium text-black mt-4">
// //                         <div className="mb-1">
                        
// //                         </div>
// //                         <div className="text-xl xl:text-2xl flex text-red-600 font-semibold mt-2">
// //                             Rs.{order.products.price}
// //                         </div>
// //                         </div>
                
// //                         <div className="bg-slate-800 w-[15%] h-10 hover:bg-slate-500 text-white font-bold py-2 px-4 border border-black-500 rounded-md mt-3">
// //                             Pending
// //                         </div>
                    
// //                     </div>
// //                     </div>
// //                     <div className='bg-slate-200 h-[50px]'>

// //                     </div>
// //                 </div>
// //                 );
// //             })}
// //         </div>
// //         {
// //             loading && 
// //             <div className='h-[550px]'>
// //             <div className='flex justify-center'>
// //                 <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-2 w-[80%]">
// //                     <Skeleton className='col-span-3 mr-5 h-[250px]'>
// //                         <Skeleton className=''/>
// //                     </Skeleton>
// //                     <Skeleton className='col-span-9  h-[250px]'>
// //                         <Skeleton/>
// //                     </Skeleton>
// //                 </div>
// //             </div>
// //             <div className='flex justify-center mt-2'>
// //                 <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-2 w-[80%]">
// //                     <Skeleton className='col-span-3 mr-5 h-[250px]'>
// //                         <Skeleton className=''/>
// //                     </Skeleton>
// //                     <Skeleton className='col-span-9  h-[250px]'>
// //                         <Skeleton/>
// //                     </Skeleton>
// //                 </div>
// //             </div>
// //             </div>
// //         }
// //         </div>
// //     </div>
// //   )
// // }

// // export default OrderPage;

'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { motion } from "framer-motion"
import { Package, ShoppingBag, Truck } from "lucide-react"
import { setOrderData } from "@/redux/actions"
import { InitialState, Order, OrderProduct } from "@/redux/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

enum OrderStatus {
  Pending = "Pending",
  Delivered = "Delivered",
  Cancelled = "Cancelled"
}

const OrderPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const userData = useSelector((state: InitialState) => state.userData)
  const orders = useSelector((state: InitialState) => state.orders)
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userData.id) {
          const orderResponse = await axios.post(`api/user/order/getOrder/${userData.id}`)
          dispatch(setOrderData(orderResponse.data))
          setLoading(false)
        }
      } catch (e) {
        console.error("Error fetching orders:", e)
        setLoading(false)
      }
    }
    fetchOrders()
  }, [userData.id, dispatch])

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending:
        return <Package className="w-5 h-5 text-yellow-500" />
      case OrderStatus.Delivered:
        return <Truck className="w-5 h-5 text-green-500" />
      case OrderStatus.Cancelled:
        return <ShoppingBag className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending:
        return "bg-yellow-100 text-yellow-800"
      case OrderStatus.Delivered:
        return "bg-green-100 text-green-800"
      case OrderStatus.Cancelled:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <ShoppingBag className="w-24 h-24 text-gray-400 mb-4" />
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">No Orders Yet</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">Looks like you haven't placed any orders. Start shopping to see your orders here!</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order: Order, orderIndex: number) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: orderIndex * 0.1 }}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Order #{order.id.slice(-6)}</span>
                  <Badge className={`${getStatusColor(order.status as OrderStatus)} flex items-center gap-1`}>
                    {getStatusIcon(order.status as OrderStatus)}
                    {order.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {order.products.map((product: OrderProduct) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 py-4 border-b border-gray-200 last:border-b-0"
                    onClick={() => router.push(`order/${order.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.product_name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-semibold text-lg mb-1">{product.product_name}</h3>
                      <p className="text-gray-600 mb-2">Quantity: {product.quantity}</p>
                      <p className="font-bold text-lg text-blue-600">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default OrderPage