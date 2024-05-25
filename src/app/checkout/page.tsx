"use client";
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setOrderData, setUserData } from "@/redux/actions";
import axios from "axios";
import { Cart, CartProduct, InitialState, Order } from "@/redux/types";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated } from '@/components/productFinalLook/ProductFinalCard';

const Checkout = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state: InitialState) => state.cart);
  const userData = useSelector((state: InitialState) => state.userData);
  let userResponse;
  const router = useRouter();

  useEffect( ()=>{
    const getuserData = async() => {
     userResponse = await isAuthenticated();
    }
  },[])

  

   



  return (
    <div>page</div>
  )
}

export default Checkout;