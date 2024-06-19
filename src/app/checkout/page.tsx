"use client"
import Appbar from "@/components/Appbar";
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setOrderData, setUserData } from "@/redux/actions";
import { Cart, CartProduct, InitialState, Order } from "@/redux/types"
import CheckOutPage from "@/components/cart/CheckOutPage";

export default function Checkout() {
 
  return (
    <div>
        <div>
          <CheckOutPage/>
        </div>
    </div>
  )
}
//export default Checkout;