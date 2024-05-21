"use client";
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setOrderData, setUserData } from "@/redux/actions";
import axios from "axios";
import { Cart, CartProduct, InitialState, Order } from "@/redux/types";
import { usePathname, useRouter } from "next/navigation";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state: InitialState) => state.cart);
  const userData = useSelector((state: InitialState) => state.userData);
  const router = useRouter();

  useEffect(() => {
    const getUserTokenData = async () => {
      try {
        const resp = await axios.get("/api/user/auth/getUser");
        console.log(resp.data.user.username);
        dispatch(
          setUserData({
            username: resp.data.user.username,
            email: resp.data.user.email,
            id: resp.data.user.userId,
          })
        );
      } catch (error) {
        logoutHandler();
      }
    };

    getUserTokenData();
  }, [dispatch]);

  const logoutHandler = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (error: any) {
      
    }
  };



  return (
    <div>page</div>
  )
}

export default Checkout;