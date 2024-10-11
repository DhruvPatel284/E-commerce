// "use client"
// import { useDispatch, useSelector } from "react-redux";
// import { setCartData, setOrderData, setUserData } from "@/redux/actions";
// import { Cart, CartProduct, InitialState, Order, Product } from "@/redux/types"
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import ProductDetails from "../productFinalLook/ProductDetails";
// import { isAuthenticated } from "../productFinalLook/ProductFinalCard";
// import { Skeleton } from "../ui/skeleton";
// import { ShoppingCartIcon } from "@heroicons/react/24/outline";
// import { useRouter } from "next/navigation";
// import Faqs from "../Faqs";

// export const CheckOutPage =  () => {

//     const userData = useSelector((state : InitialState) => state.userData);
//     const dispatch = useDispatch();
//     const [loading , setLoading ] = useState<boolean>(true);
//     const [ totalprice , setotalprice ] = useState<number>(0);
//     const cartData = useSelector((state : InitialState ) => state.cart);
//     const route = useRouter();
//     let amount:number = 0;
//     useEffect(() => {
//         const fetchingCartData = async () => {
//             try{
//                 if(cartData && userData){
//                     let amount:number = 0;
//                     const totalamount = cartData.products.map((product:CartProduct) => {
//                         amount += (product.price * product.quantity);
//                     })
//                     setotalprice(amount);
//                     setLoading(false);
//                 }
//             }
//             catch(e){

//             }
//         };
//         fetchingCartData();
//     } ,[cartData])
//     const deleteHandler = async (id : string) => {
//         try{    
//             const FilteredNewCartData= cartData.products?.filter((product:CartProduct)=> {
//                 return product.id !== id;
//             });
//             let newCartVAlue = {
//                 id : cartData.id,
//                 products : FilteredNewCartData
//             }
//             const DeletedResponce = await axios.post(`api/user/cart/update/${cartData.id}`,newCartVAlue);
//             dispatch(setCartData(DeletedResponce.data));

//         }
//         catch(e){

//         }
//     }
//     const incrementHandler = async (id : string)  => {

//         try{
//             console.log(id);     
//             const quantityUpdatedData = cartData.products.map((product : CartProduct ) => {
//                 if(product.id === id) {
//                     return {...product, quantity : product.quantity + 1}
//                 }else{
//                     return { ...product };
//                 }
//             })
//             let newCartVAlue = {
//                 id : cartData.id,
//                 products : quantityUpdatedData
//             }
//             const incrementedResponse = await axios.post(`api/user/cart/update/${cartData.id}`,newCartVAlue);
//             dispatch(setCartData(incrementedResponse.data));
//         }
//         catch(e){

//         }
//     }
//     const decrementHandler = async ( id : string , quantity : number ) => {
//         try{
//             console.log(id);
//             if( quantity === 1 ){
//                 deleteHandler(id);
//             }
//             else{
//                 const quantityUpdatedData = cartData.products.map((product : CartProduct ) => {
//                     if(product.id === id) {
//                         return {...product, quantity : product.quantity - 1};
//                     }else{
//                         return { ...product };
//                     }
//                 })
//                 console.log(quantityUpdatedData);
//                 let newCartVAlue = {
//                     id : cartData.id,
//                     products : quantityUpdatedData
//                 }
//                 const decrementedResponse = await axios.post(`api/user/cart/update/${cartData.id}`,newCartVAlue);
//                 dispatch(setCartData(decrementedResponse.data));
//             }
            
//         }
//         catch(e){

//         }
//     }
//     if( !loading && cartData.products.length === 0 ){
//         return <div className="h-full w-full flex flex-col justify-center items-center">
//             <div className="text-xl md:text-3xl text-purple-800 font-semibold mt-5">
//                 Cart Is Empty
//             </div>
//             <div>
//             <img src="../images/cartempty.png" alt="" />
//             </div>
//         </div>
//     }
//     else{
//     return (
//         <div className="min-h-[600px] bg-slate-100">
//             { !loading && <div className=" bg-slate-100 ">
//                 <div className="min-w-[1000px] max-w-[1500px] ml-[20%]  ">
//                     <div className="grid grid-cols-8 gap-10 ">
//                     {/* Products */}
//                     <div className="col-span-6 bg-white ">
//                         <div className="text-2xl xl:text-5xl text-slate-800 font-sans font-bold m-4 flex justify-center hover:scale-110 transition-all">
//                             <ShoppingCartIcon className="h-[50px] text-yellow-600"/>
//                             <div className="">
//                                 Cart
//                             </div>
//                         </div>
//                         {cartData.products && cartData.products.map((product : CartProduct) => {
                            
//                         return (
//                             <div className="mt-10" key={product.id}>
//                             <div className="grid grid-cols-12 h-[250px]">
//                                 <div className="col-span-10 grid grid-cols-8 divide-y divide-gray-400">
//                                 <div className="col-span-4 xl:col-span-2">
//                                     <Link href={`/`}>
//                                         <img
//                                             className="p-4 m-auto ml-3 hover:scale-110 transition-all"
//                                             src={product.image}
//                                             alt="Checkout product"
//                                         />
//                                     </Link>
//                                 </div>
//                                 <div className="col-span-7 xl:col-span-6 flex">
//                                     <div className="font-medium text-black ml-10 mt-2">
//                                         <div className="">
//                                             <div className="text-xl xl:text-2xl  font-semibold text-blue-900">
//                                                 {product.product_name}
//                                             </div>
//                                             <div className="max-h-[195px] mt-3 text-md overflow-hidden">
//                                                 {product.product_description}
//                                             </div>
                                            
//                                         </div>
//                                     </div>
                                    

                                    
                                    
//                                 </div>
//                                 </div>
//                                 <div className="col-span-3 xl:col-span-2 ml-5" >
//                                         <div>
//                                             <button
//                                                 className="text-sm flex xl:text-base font-semibold rounded text-blue-600 mt-2 hover:text-blue-400 cursor-pointer"
//                                                 onClick={() => {
//                                                     deleteHandler(product.id );
//                                                 }}
//                                             >
//                                                 <div>
//                                                     Delete
//                                                 </div>
//                                                 <div className="mt-1">
//                                                     <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//                                                     </svg>
//                                                 </div>
                                            
//                                             </button>
//                                         </div>
//                                     <div className="text-lg xl:text-xl mt-1 mr-4 text-red-700   font-bold hover:text-red-500 cursor-pointer">
//                                         Rs.{product.price}
//                                     </div>
//                                     <div className="mt-3">
                                        
//                                         <div className="grid grid-cols-3 w-20 text-center">
//                                             <button
//                                                 className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer hover:bg-gray-500"
//                                                 onClick={ () => {
//                                                     decrementHandler(product.id , product.quantity);
//                                                 }}
//                                             >
//                                                 -
//                                             </button>
//                                             <div className="text-lg xl:text-xl bg-gray-200">
//                                                 {product.quantity}
//                                             </div>
//                                             <button
//                                                 className="text-xl xl:text-2xl bg-gray-400 hover:bg-gray-500 rounded cursor-pointer"
//                                                 onClick={() => {
//                                                     incrementHandler(product.id);
//                                                 }}
//                                             >
//                                                 +
//                                             </button>
//                                         </div>
//                                             <div className="mt-2">
//                                                 <button onClick={() => {
//                                                     route.push(`/payment/${product.id}?quantity=${product.quantity}`)
//                                                 }} className="bg-slate-600  h-10 hover:bg-slate-500 text-white font-bold py-2 px-4 border border-black-500 rounded-md mt-3">
//                                                     Buy
//                                                 </button>
//                                             </div>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             </div>
//                         );
//                         })}
//                         <div className="h-[0.1px] bg-slate-400 mt-[50px] w-[90%] ml-auto mr-auto">

//                         </div>
//                         <div className="text-lg xl:text-xl mt-5 text-right mb-1 mr-8 font-semibold text-black">
//                         Subtotal ({} items) : {" "} <span className="text-red-600">Rs.{totalprice}</span>
//                         </div>
//                         <div className=" flex justify-end mr-7 h-[100px]">
//                                 <button onClick={() => {
//                                                     route.push(`/payment/cart`)
//                                                 }} className="bg-slate-800  h-10 hover:bg-slate-500 text-white font-semibold py-2 px-4 border border-black-500 rounded-md mt-3">
//                                                    Begin CheckOut 
//                                 </button>
//                         </div>
//                     </div>
//                     {/* Checkout */}
//                     <div className="col-span-2 bg-white rounded h-[250px] p-7">
//                         <div className="text-xs xl:text-sm text-green-800 mb-2">
//                         Your order qualifies for{" "}
//                         <span className="font-bold">FREE DELIVERY</span>. Delivery Details
//                         </div>
//                         <div className="text-base xl:text-lg mb-4">
//                         Subtotal ({cartData.products.length} items):{" "}
//                         <span className="font-semibold">
//                             Rs . {totalprice}
//                         </span>
//                         </div>
//                         <button className="text-blue-800 font-semibold" onClick={() => {
//                             route.push(`/payment/cart`);
//                         }}>Proceed to Checkout</button>
//                     </div>
                    
//                     </div>
//                     <div className="h-[50px] bg-slate-100 ">
                        
//                     </div>
//                 </div>
                
//                 </div>
//                 }{
                    
//                         loading && 
//                         <div className='h-[550px]'>
//                         <div className='flex justify-center'>
//                             <div className="h-[250px] grid grid-cols-12  mt-1 mb-2 w-[80%]">
//                                 <Skeleton className='col-span-3  h-[250px]'>
//                                     <Skeleton className=''/>
//                                 </Skeleton>
//                                 <Skeleton className='col-span-9  h-[250px]'>
//                                     <Skeleton/>
//                                 </Skeleton>
//                             </div>
//                         </div>
//                         <div className='flex justify-center mt-1'>
//                             <div className="h-[250px] grid grid-cols-12  mt-1 mb-2 w-[80%]">
//                                 <Skeleton className='col-span-3  h-[250px]'>
//                                     <Skeleton className=''/>
//                                 </Skeleton>
//                                 <Skeleton className='col-span-9  h-[250px]'>
//                                     <Skeleton/>
//                                 </Skeleton>
//                             </div>
//                         </div>
//                         </div>
                    
//                 }
//         </div>
//     )
//     }
// }
// export default CheckOutPage;

'use client'

import { useDispatch, useSelector } from "react-redux"
import { setCartData } from "@/redux/actions"
import { CartProduct, InitialState } from "@/redux/types"
import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, ShoppingCart } from "lucide-react"
import Appbar from "../Appbar"

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function CartPage() {
  const userData = useSelector((state: InitialState) => state.userData)
  const cartData = useSelector((state: InitialState) => state.cart)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    const fetchingCartData = async () => {
      try {
        if (cartData && userData) {
          let amount = 0
          cartData.products.forEach((product: CartProduct) => {
            amount += product.price * product.quantity
          })
          setTotalPrice(amount)
          setLoading(false)
        }
      } catch (e) {
        console.error("Error fetching cart data:", e)
      }
    }
    fetchingCartData()
  }, [cartData, userData])

  const deleteHandler = async (id: string) => {
    try {
      const filteredNewCartData = cartData.products?.filter(
        (product: CartProduct) => product.id !== id
      )
      const newCartValue = {
        id: cartData.id,
        products: filteredNewCartData,
      }
      const deletedResponse = await axios.post(
        `api/user/cart/update/${cartData.id}`,
        newCartValue
      )
      dispatch(setCartData(deletedResponse.data))
    } catch (e) {
      console.error("Error deleting item:", e)
    }
  }

  const updateQuantity = async (id: string, newQuantity: number) => {
    try {
      const updatedProducts = cartData.products.map((product: CartProduct) => {
        if (product.id === id) {
          return { ...product, quantity: newQuantity }
        }
        return product
      })
      const newCartValue = {
        id: cartData.id,
        products: updatedProducts,
      }
      const response = await axios.post(
        `api/user/cart/update/${cartData.id}`,
        newCartValue
      )
      dispatch(setCartData(response.data))
    } catch (e) {
      console.error("Error updating quantity:", e)
    }
  }

  const handleBuyNow = (productId: string, quantity: number) => {
    router.push(`/payment/${productId}?quantity=${quantity}`)
  }

  if (!loading && cartData.products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div 
          className="flex flex-col items-center justify-center h-[calc(100vh-64px)] px-4"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeIn}
        >
          <ShoppingBag className="w-32 h-32 text-gray-300 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8 text-center max-w-md text-lg">Discover our latest collection and find something special just for you.</p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Explore Products
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your Exquisite Selection
        </motion.h1>
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-40 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {cartData.products.map((product: CartProduct, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/3 h-60 sm:h-auto relative overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.product_name} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-xl mb-2 text-gray-800">{product.product_name}</h3>
                            <p className="text-gray-600 line-clamp-2 mb-4">{product.product_description}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between items-end">
                            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(product.id, Math.max(1, product.quantity - 1))}
                                className="rounded-full w-8 h-8"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-medium text-lg">{product.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                className="rounded-full w-8 h-8"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-2xl text-gray-800 mb-2">₹{product.price * product.quantity}</p>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => deleteHandler(product.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleBuyNow(product.id, product.quantity)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Buy Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="sticky top-20 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-xl">
                    <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg">
                        <span>Subtotal</span>
                        <span className="font-semibold">₹{totalPrice}</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span>Shipping</span>
                        <span className="text-green-600 font-semibold">Free</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span>Taxes</span>
                        <span className="italic text-gray-600">Calculated at checkout</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between text-xl font-bold">
                          <span>Total</span>
                          <span>₹{totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch">
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                      size="lg"
                      onClick={() => router.push('/payment/cart')}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}