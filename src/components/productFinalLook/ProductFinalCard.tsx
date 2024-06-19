"use client"
import Appbar from "../Appbar";
import Link from "next/link";
import ProductDetails from "./ProductDetails";
import { Button } from "../ui/Button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { NextResponse } from "next/server";
// import { getCookie, setCookies } from 'cookies-next'
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setOrderData, setUserData } from "@/redux/actions";
import { Cart, CartProduct, InitialState, Order } from "@/redux/types"
import { stat } from "fs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { GB_CURRENCY } from "../utils/constants";
// import { callAPI } from "../utils/CallApi";
// import { addToCart } from "../redux/cartSlice";

interface Product {
    product_name: string;
    product_description: string;
    price: number;
    image: string;
    id: string;
    category: string;
    stock : number;
    quantity?: number;
  }

  export const isAuthenticated = async () => {
    try{
        console.log("Is Authenticated")
        const response = await axios.get("/api/user/Auth/getUser");
        return response;
    }
    catch(e){
        console.log(e);
        return ;     
    }
  }
export const ProductFinalCard = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const cartData = useSelector((state : InitialState ) => state.cart)
    const userData = useSelector((state : InitialState) => state.userData)
    const [product , setProduct] = useState< Product | null >(null);
    const [loading , setloading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const ProductData = async () => {
            try{
                console.log(params.productId);
                const response = await axios.post(`/api/user/product/getProduct/[productId]`,
                {
                    "productId" : params.productId
                })
                 setProduct(response.data);
                 setloading(false);    
            }catch(e){
                setProduct(null);
                setloading(false)
            }
        };
        if(loading){
            ProductData();
        }
    },[]);

    useEffect(() => {

        const checkIfProductInCart = async () => {
                try {
                    if (cartData) {
                        const productInCart = cartData.products.some((item: any) => item.id === product?.id);
                        setIsInCart(productInCart);
                    }
                } catch (error) {
                    console.log("Error fetching cart data:", error);
                }
            }
        
        if(product) {
            checkIfProductInCart();
        }
    }, [product]);

    const handleAddToCart = async () => {
        const response = await isAuthenticated();
        if (!response || response.status !== 200) {
            router.push(`/signin`)
            toast.error("user have login first");
            return;
        }
        dispatch(setUserData({
          username : response.data.user.username,
          email: response.data.user.email,
          id: response.data.user.id,
        }))
        const ruserData = response.data.user;

        try {
          const cartResponse = await axios.post(`/api/user/cart/get/[userId]/?userId=${ruserData.userId}`);
          const productWithQuantity = { ...product, quantity: 1 };
          if (cartResponse.data !== "Cart not found") {
            updateCartInDatabase(cartResponse.data,productWithQuantity);
          } else {
            createCartInDatabase(ruserData.userId,productWithQuantity);
          }
        } catch (error) {
          console.log("Error fetching cart data:", error);
        }
        
    };
    
    const createCartInDatabase = async (ruserId:string,sendData: any) => {
        try {

          const { data } = await axios.post("/api/user/cart/create", {
            products: [sendData],
            userId: ruserId,
          });
          dispatch(setCartData({
            products: [sendData],
            id: data.id,
          }));
          router.push("/checkout");

        } catch (error) {
          console.log(error);
          alert("Something went wrong while creating the cart");
        }
      };
    
      const updateCartInDatabase = async (respcartData: Cart, sendData: any) => {
        try {
          const cartId = respcartData.id;
          const updatedCartData = {
            id: cartId,
            products: [...respcartData.products, sendData]
          };
          await axios.post(`/api/user/cart/update/[cartId]/?cartId=${cartId}`, updatedCartData);
          dispatch(setCartData(updatedCartData));
          router.push("/checkout");

        } catch (error) {
          console.log("Error updating cart!");
        }
      };
    
        return (
      <div >
        
        <div className=" bg-slate-00">
            {
              !loading && product && (<div className=" mt- min-h-[590px]">
                    <div className="min-w-[1000px] max-w-[1500px] bg-slate-100 p-4">
                    <div className="grid grid-cols-10 gap-2 border-2 ">
                        {/* Left */}
                        <div className=" p-8 col-span-8 rounded bg-white  md:col-span-2">
                            <img className="max-h-[350px] hover:scale-110 transition-all" src={product.image} alt="Main product" />
                        </div>
                        {/* Middle */}
                        <div className="col-span-4 p-4 pl-8 rounded bg-white divide-y divide-gray-400 md:col-span-6">
                        <div className="mb-3">
                            <ProductDetails product_name={product.product_name} product_category={""}/>
                        </div>
                        <div className="text-base xl:text-lg mt-3">
                            {product.product_description}
                        </div>
                        </div>
                        {/* Right */}
                        <div className="col-span-8 p-4 pl-8 rounded bg-white md:col-span-2">
                            <div className="text-xl xl:text-2xl text-red-700 hover:text-red-500  font-semibold">
                                Rs.{product.price}
                            </div>
                            <div className="text-sm xl:text-base text-blue-500 font-semibold mt-3">
                                FREE Returns
                            </div>
                            <div className="text-sm xl:text-base text-blue-500 font-semibold mt-1">
                                FREE Delivery
                            </div>
                            <div className="text-base xl:text-lg text-green-700 font-semibold mt-1">
                                { product.stock || 0 > 0 ? "In Stock" : "Out of Stock"}
                            </div>
                            <div className="flex flex-col" >
                                <div onClick={() => {
                                  if( userData.id ){
                                    router.push(`/payment/${product.id}?quantity=${1}`);
                                  }
                                  else{
                                    router.push(`/signin`);
                                    toast.error("user have to login first");
                                  }
                                }}   className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 border border-black w-[50%] rounded-md mt-3">
                                    Buy Now
                                </div>
                                <button
                                        onClick={isInCart ? () => { router.push(`/checkout`) } : handleAddToCart}
                                        className={`w-[50%] h-10 font-bold py-2 px-4 border rounded-md mt-3 ${isInCart ? 'bg-blue-500 hover:bg-blue-700' : 'bg-yellow-500 hover:bg-yellow-700'} text-white`}
                                    >   <div className="flex ml-3 justify-center">
                                            {isInCart ? "View" : "Add"} <ShoppingCartIcon className="ml-2 h-6 "/>
                                        </div>
                                        
                                    </button>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
            )}
    
           { loading && (<div>

                <div className="bg-slate-100 min-h-[590px]">
                <div className="min-w-[1000px] max-w-[1500px] h-[450px] p-4">
                    <div className="grid grid-cols-10 gap-2 border-2">
                        {/* Left */}
                      
                            <Skeleton className="col-span-2 w-[250px] p-4 rounded  m-auto h-[400px]"/>
                        
                      
                             <Skeleton className="col-span-6 p-4 h-[400px] rounded  divide-y "/>
                      
                        {/* Right */}
                     
                            <Skeleton className="col-span-2 p-4 h-[400px] rounded"/>
                        
    
                        </div>
                    </div>
                </div>
            </div>
           )}
        </div>
      </div>
    )
}
export default ProductFinalCard;