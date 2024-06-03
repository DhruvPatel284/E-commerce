"use client"
import Appbar from "../Appbar";
import Link from "next/link";
import ProductDetails from "./ProductDetails";
import { Button } from "../ui/Button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { getCookie, setCookie } from 'cookies-next'
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setOrderData, setUserData } from "@/redux/actions";
import axios from "axios";
import { Cart, CartProduct, InitialState, Order } from "@/redux/types";
import toast from "react-hot-toast";

export interface Product {
    product_name: string;
    product_description: string;
    price: number;
    image: string;
    id: string;
    category: string;
    quantity: number;
  }

  export const isAuthenticated = async () => {
    try {
      const response = await axios.get("/api/user/auth/getUser");
      return response;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return ;
    }
  };
export const ProductFinalCard = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const cartData = useSelector((state: InitialState) => state.cart);
    const userData = useSelector((state: InitialState) => state.userData);
    const [product , setProduct] = useState< Product | null >(null);
    const [loading , setloading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);
    const navigate = useRouter();
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
  }, [product, dispatch]);
   
    const handleAddToCart = async () => {
       
        try {
          const productWithQuantity = { ...product, quantity: 1 };
          if (cartData.products) {
            // Cart exists, update it
            updateCartInDatabase(cartData,productWithQuantity);
          } else {
            // No cart found, create a new one
            createCartInDatabase(userData.id,productWithQuantity);
          }
        } catch (error) {
          console.log("Error fetching cart data:", error);
        }
        
    };
    
    const createCartInDatabase = async (ruserId:string,sendData: any) => {
        try {
        
          const { data } = await axios.post("/api/cart/create", {
            products: [sendData],
            userId: ruserId,
          });
          dispatch(setCartData({
            products: [ sendData],
            id: data.id,
          }));
          navigate.push("/checkout")
          // window.location.href = "/checkout";
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
          await axios.post(`/api/cart/update/[cartId]/?cartId=${cartId}`, updatedCartData);
          dispatch(setCartData(updatedCartData));
          
          navigate.push("/checkout")
        } catch (error) {
          console.log("Error updating cart!");
        }
      };
   
    return (
      <div className="bg-slate-200">
        
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
                         
                           
                                <button className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 border
                                 border-black w-[50%] rounded-md mt-3" onClick={()=>{navigate.push(`/payment/${product.id}`)}}>
                                    Buy Now
                                </button>
                               
                                <button
                                        onClick={isInCart ? () => navigate.push(`/checkout`) : handleAddToCart}
                                        className={`w-[50%] h-10 font-bold py-2 px-4 border rounded-md mt-3 ${isInCart ? 'bg-blue-500 hover:bg-blue-700' : 'bg-yellow-500 hover:bg-yellow-700'} text-white`}
                                    >
                                        {isInCart ? "View In Cart" : "Add to Cart"}
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