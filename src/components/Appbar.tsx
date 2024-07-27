"use client"
import { isAuthenticated } from "./productFinalLook/ProductFinalCard";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { User } from "@/redux/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setOrderData, setUserData } from "@/redux/actions";
import { Cart, CartProduct, InitialState, Order, Product } from "@/redux/types"



const Appbar = () => {
  const [isUserExisted, setIsUserExisted] = useState(false);
  const userData = useSelector((state : InitialState) => state.userData);
  const cartData = useSelector((state : InitialState ) => state.cart);
  const orderData = useSelector((state : InitialState ) => state.orders);
  const dispatch = useDispatch();
  const route = useRouter();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await isAuthenticated();
        if (!response || response.status !== 200) {
          return;
        }
        setIsUserExisted(true);
        const user = {
          id:response.data.user.userId,
          username:response.data.user.username,
          email:response.data.user.email,
        }
        dispatch(setUserData(user));

        const CartResponse = await axios.post(`/api/user/cart/get/${response.data.user.userId}`);
        if( CartResponse.status == 404 ){
          dispatch(setCartData({
            id : "",
            products : []
          }));
        }else{
          dispatch(setCartData(CartResponse.data));
        }
        
        
        if(userData.id){
          
        }
      } catch (error) {
        console.error('Error while fetching user', error);
      }
    };
    getUserData();
  }, [userData.id,dispatch]);
  const logoutHandler = async () => {
    try {
      await axios.get("/api/user/Auth/signout");
      dispatch(setUserData({
        id: "",
        username: "",
        email : ""
      }))
      dispatch(setCartData({
        id:"",
        products : []
      }))
      toast.success("Log Out Successfully");
      window.location.href = "/";
    } catch (error: any) {
    
    }
  }
  const renderUserButton = () => {
    if (isUserExisted && userData) {
      const userInitial = userData.username?.charAt(0).toUpperCase();
      return (
        <div className="flex items-center">
          
          <Link href={"/checkout"}>
            <div className="flex mr-6">
              <ShoppingCartIcon className="h-[48px]" />
            </div>
          </Link>
            <DropdownMenu >
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer select-none bg-slate-500">
                 
                    <AvatarFallback>
                      {userInitial}
                    </AvatarFallback>
                
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute -right-2 bg-white">
                <DropdownMenuLabel className="text-black bg-white">{userData.email}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-black" />
                <DropdownMenuItem
                  className="cursor-pointer text-blue-900 font-semibold"
                  onClick={() => {
                    route.push("/profile");
                  }
                  }
                >
                  Personal Info
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-blue-900 font-semibold"
                  onClick={() => {
                    route.push("/order");
                  }}
                >
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-red-500  font-semibold"
                  onClick={logoutHandler}
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
         
        </div>
      );
    } else {
      return (
        <Link href={"/signin"}>
          <div className="pr-4 pl-4">
            <div className="text-xs xl:text-xl font-bold">Login</div>
          </div>
        </Link>
      );
    }
  };

  return (
    <header className="min-w-[1000px] h-[70px]">
      <div className="flex bg-slate-950 text-white h-[70px]">
        {/* Left */}
        <div className=" flex items-center m-4">
          <Link href={"/"} >
            <img
              className=" rounded-md max-h-[50px] max-w-[90px] m-2 ml-4"
              src={"../images/logo1.jpg"}
              alt="logo"
            />
          </Link>
          <div className="pr-4 ">
            <div className="text-sm xl:text-base font-bold">D-Kart</div>
          </div>
        </div>
        {/* Middle */}
        <div className="flex grow relative items-center">
          <Search />
        </div>
        {/* Right */}
        <div className="flex items-center m-4">   
          {renderUserButton()}
        </div>
      </div>
      
    </header>
  );
};

export default Appbar;