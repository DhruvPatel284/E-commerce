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
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const temp = () => {
    const cartData = useSelector((state : InitialState ) => state.cart);
    useEffect(()=>{
        console.log(cartData);
    },[])
  return (
    <div>
        {cartData && cartData.products.map((product : CartProduct) => {
            return <div>
                {product.image}
                <div>
                    {product.product_description}
                </div>
            </div>
        })}
    </div>
  )
}

export default temp;