"use client"
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setOrderData, setUserData } from "@/redux/actions";
import { Cart, CartProduct, InitialState, Order, Product } from "@/redux/types"
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductDetails from "../productFinalLook/ProductDetails";
import { isAuthenticated } from "../productFinalLook/ProductFinalCard";
import { Skeleton } from "../ui/skeleton";


export const CheckOutPage =  () => {

    // const userData = useSelector((state : InitialState) => state.userData);
    // console.log(userData);
    
    const [CartProduct , setCartProduct] = useState< CartProduct[] | null >(null);
    const [loading , setLoading ] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchingCartData = async () => {
            try{
                const userDetails = await isAuthenticated();
                const userId = userDetails?.data.user.userId;
                const CartResponse = await axios.post(`api/cart/get/[userId]/?userId=${userId}`);
                const insertInState = CartResponse.data.products;
                setCartProduct( CartResponse.data.products );
                setLoading(false);
            }
            catch(e){
                console.log(e);
            }
        };
        fetchingCartData();
    } ,[])
    const deleteHandler = async (id : string) => {
        try{
            console.log(id);
         
            // CartResponse.data.products = CartResponse.data.products.filter(product => {
            //     return product.productId !== id;
            // });
            // console.log(CartResponse.data)
            const userDetails = await isAuthenticated();
            const CartResponse = await axios.post(`api/cart/get/[userId]/?userId=${userDetails?.data.user.userId}`);
           
            const FilteredNewCartData= CartResponse.data.products?.filter((product:CartProduct)=> {
                return product.id !== id;
            });
            console.log(FilteredNewCartData);
            let newCartVAlue = {
                id : CartResponse.data.id,
                products : FilteredNewCartData
            }
            const DeletedResponce = await axios.post(`api/cart/update/[cartId]/?cartId=${CartResponse.data.id}`,newCartVAlue);
            setCartProduct(FilteredNewCartData);
            console.log(CartProduct);
        }
        catch(e){

        }
    }
 
  return (
    <div className="">
        { !loading && <div className=" bg-amazonclone-background  bg-slate-100 ">
            <div className="min-w-[1000px] max-w-[1500px] ml-[20%]  ">
                <div className="grid grid-cols-8 gap-10 ">
                {/* Products */}
                <div className="col-span-6 bg-white ">
                    <div className="text-2xl xl:text-3xl font-sans font-semibold m-4 flex justify-center">
                        Shopping Cart
                    </div>
                    {CartProduct && CartProduct.map((product : CartProduct) => {
                    return (
                        <div className="mt-10" key={product.id}>
                        <div className="grid grid-cols-12">
                            <div className="col-span-10 grid grid-cols-8 divide-y divide-gray-400">
                            <div className="col-span-4 xl:col-span-2">
                                <Link href={`/`}>
                                    <img
                                        className="p-4 m-auto ml-3 hover:scale-110 transition-all"
                                        src={product.image}
                                        alt="Checkout product"
                                    />
                                </Link>
                            </div>
                            <div className="col-span-7 xl:col-span-6 flex">
                                <div className="font-medium text-black ml-10 mt-2">
                                    <div className="">
                                        <div className="text-xl xl:text-2xl  font-semibold text-blue-900">
                                            {product.product_name}
                                        </div>
                                        <div className="max-h-[100px] mt-3 text-md overflow-hidden">
                                            {product.product_description}
                                        </div>
                                        <div>
                                            <button className="bg-slate-700 w-[150px] h-10 hover:bg-slate-500 text-white font-bold py-2 px-4 border border-black-500 rounded-md mt-3">
                                                View More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                

                                
                                
                            </div>
                            </div>
                            <div className="col-span-3 xl:col-span-2">
                                    <div>
                                        <button
                                            className="text-sm xl:text-base font-semibold rounded text-blue-500 mt-2  cursor-pointer"
                                            onClick={() => {
                                                deleteHandler(product.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                <div className="text-lg xl:text-xl mt-1 mr-4 text-red-800 font-semibold">
                                    Rs.{product.price}
                                </div>
                                <div className="mt-3">
                                    
                                    <div className="grid grid-cols-3 w-20 text-center">
                                        <div
                                            className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer"
                                        
                                        >
                                            -
                                        </div>
                                        <div className="text-lg xl:text-xl bg-gray-200">
                                            {product.quantity}
                                        </div>
                                        <div
                                            className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer"
                                        
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    );
                    })}
                    {/* <div className="text-lg xl:text-xl text-right mb-4 mr-4">
                    Subtotal ({itemsNumber} items):{" "}
                    <span className="font-semibold">
                        {GB_CURRENCY.format(subtotal)}
                    </span>
                    </div> */}
                </div>
                {/* Checkout */}
                {/* <div className="col-span-2 bg-white rounded h-[250px] p-7">
                    <div className="text-xs xl:text-sm text-green-800 mb-2">
                    Your order qualifies for{" "}
                    <span className="font-bold">FREE DELIVERY</span>. Delivery Details
                    </div>
                    <div className="text-base xl:text-lg mb-4">
                    Subtotal ({itemsNumber} items):{" "}
                    <span className="font-semibold">
                        {GB_CURRENCY.format(subtotal)}
                    </span>
                    </div>
                    <button className="btn">Proceed to Checkout</button>
                </div> */}
                </div>
            </div>
            </div>
            }{
                
                    loading && 
                    <div className='h-[550px]'>
                      <div className='flex justify-center'>
                        <div className="h-[250px] grid grid-cols-12  mt-1 mb-2 w-[80%]">
                              <Skeleton className='col-span-3  h-[250px]'>
                                <Skeleton className=''/>
                              </Skeleton>
                              <Skeleton className='col-span-9  h-[250px]'>
                                <Skeleton/>
                              </Skeleton>
                        </div>
                      </div>
                      <div className='flex justify-center mt-1'>
                        <div className="h-[250px] grid grid-cols-12  mt-1 mb-2 w-[80%]">
                              <Skeleton className='col-span-3  h-[250px]'>
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
  )
}
export default CheckOutPage;