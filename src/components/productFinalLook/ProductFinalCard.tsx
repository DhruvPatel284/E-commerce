"use client"
import Appbar from "../Appbar";
import Link from "next/link";
import ProductDetails from "./ProductDetails";
import { Button } from "../ui/Button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { getCookie, setCookie } from 'cookies-next'


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
    quantity: number;
  }

  const isAuthenticated = async () => {
    try {
      const response = await axios.get("/api/user/auth/getUser");
      console.log(response.status);
      return response.status;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return ;
    }
  };
export const ProductFinalCard = () => {
    const params = useParams();
    const [product , setProduct] = useState< Product | null >(null);
    const [loading , setloading] = useState(true);
    
    useEffect(() => {
        const ProductData = async () => {
            try{
                console.log(params.productId);
                const response = await axios.post(`/api/product/getProduct/[productId]`,
                {
                    "productId" : params.productId
                })
                 setProduct(response.data);
                 setloading(false);
                 console.log(response.data);    
            }catch(e){
                setProduct(null);
                setloading(false)
            }
        };
        if(loading){
            ProductData();
        }
    },[loading , params.productId]);
   
    const handleAddToCart = async () => {
         const status = await isAuthenticated();
         if(status !== 200){
            
                alert("it seems like you not register or signed in");  
        
             return ;
         }
         if(status === 200){
            window.location.href = "/checkout";
         }
    };

   
    return (
      <div className="bg-slate-200">
        <Appbar/>
        <div>
            {
              !loading && product && (<div className="bg-slate-200 mt-7 ">
                    <div className="min-w-[1000px] max-w-[1500px]  p-4">
                    <div className="grid grid-cols-10 gap-2 border-2">
                        {/* Left */}
                        <div className=" p-8 col-span-8 rounded bg-white  md:col-span-2">
                            <img className="max-h-[350px]" src={product.image} alt="Main product" />
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
                            <div className="text-xl xl:text-2xl text-red-700  font-semibold">
                                Rs.{product.price}
                            </div>
                            <div className="text-sm xl:text-base text-blue-500 font-semibold mt-3">
                                FREE Returns
                            </div>
                            <div className="text-sm xl:text-base text-blue-500 font-semibold mt-1">
                                FREE Delivery
                            </div>
                            <div className="text-base xl:text-lg text-green-700 font-semibold mt-1">
                                { product.quantity > 0 ? "In Stock" : "Out of Stock"}
                            </div>
                            <div className="text-base xl:text-lg mt-1">
                                Quantity:
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <Link href={"/checkout"} className="flex flex-col" >
                                <button className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 border border-black w-[50%] rounded-md mt-3">
                                    Buy Now
                                </button>
                                </Link>
                                <button 
                                onClick={handleAddToCart}
                                className="bg-yellow-500 w-[50%] h-10 hover:bg-yellow-700 text-white font-bold py-2 px-4 border border-black-500 rounded-md mt-3">
                                    Add to Cart
                                </button>
                          
                            </div>
                    </div>
                </div>
            </div>
            )}
    
           { loading && (<div>

                <div className="bg-slate-200 mt-7">
                <div className="min-w-[1000px] max-w-[1500px] h-[450px] p-4">
                    <div className="grid grid-cols-10 gap-2 border-2">
                        {/* Left */}
                      
                            <Skeleton className="col-span-2 w-[200px] p-8 rounded  m-auto h-[400px]"/>
                        
                      
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