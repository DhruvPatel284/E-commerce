// "use client"
// import { isAuthenticated } from "./productFinalLook/ProductFinalCard";
// import axios from "axios";
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Search from "./Search";
// import { ShoppingCartIcon } from "@heroicons/react/24/outline";
// import { User } from "@/redux/types";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { setCartData, setOrderData, setUserData } from "@/redux/actions";
// import { Cart, CartProduct, InitialState, Order, Product } from "@/redux/types"



// const Appbar = () => {
//   const [isUserExisted, setIsUserExisted] = useState(false);
//   const userData = useSelector((state : InitialState) => state.userData);
//   const cartData = useSelector((state : InitialState ) => state.cart);
//   const orderData = useSelector((state : InitialState ) => state.orders);
//   const dispatch = useDispatch();
//   const route = useRouter();
//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const response = await isAuthenticated();
//         if (!response || response.status !== 200) {
//           return;
//         }
//         setIsUserExisted(true);
//         const user = {
//           id:response.data.user.userId,
//           username:response.data.user.username,
//           email:response.data.user.email,
//         }
//         dispatch(setUserData(user));

//         const CartResponse = await axios.post(`/api/user/cart/get/${response.data.user.userId}`);
//         if( CartResponse.status == 404 ){
//           dispatch(setCartData({
//             id : "",
//             products : []
//           }));
//         }else{
//           dispatch(setCartData(CartResponse.data));
//         }
        
        
//         if(userData.id){
          
//         }
//       } catch (error) {
//         console.error('Error while fetching user', error);
//       }
//     };
//     getUserData();
//   }, [userData.id,dispatch]);
//   const logoutHandler = async () => {
//     try {
//       await axios.get("/api/user/Auth/signout");
//       dispatch(setUserData({
//         id: "",
//         username: "",
//         email : ""
//       }))
//       dispatch(setCartData({
//         id:"",
//         products : []
//       }))
//       toast.success("Log Out Successfully");
//       window.location.href = "/";
//     } catch (error: any) {
    
//     }
//   }
//   const renderUserButton = () => {
//     if (isUserExisted && userData) {
//       const userInitial = userData.username?.charAt(0).toUpperCase();
//       return (
//         <div className="flex items-center">
          
//           <Link href={"/checkout"}>
//             <div className="flex mr-6">
//               <ShoppingCartIcon className="h-[48px]" />
//             </div>
//           </Link>
//             <DropdownMenu >
//               <DropdownMenuTrigger>
//                 <Avatar className="cursor-pointer select-none bg-slate-500">
                 
//                     <AvatarFallback>
//                       {userInitial}
//                     </AvatarFallback>
                
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="absolute -right-2 bg-white">
//                 <DropdownMenuLabel className="text-black bg-white">{userData.email}</DropdownMenuLabel>
//                 <DropdownMenuSeparator className="bg-black" />
//                 <DropdownMenuItem
//                   className="cursor-pointer text-blue-900 font-semibold"
//                   onClick={() => {
//                     route.push("/profile");
//                   }
//                   }
//                 >
//                   Personal Info
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   className="cursor-pointer text-blue-900 font-semibold"
//                   onClick={() => {
//                     route.push("/order");
//                   }}
//                 >
//                   My Orders
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   className="cursor-pointer text-red-500  font-semibold"
//                   onClick={logoutHandler}
//                 >
//                   Log Out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
         
//         </div>
//       );
//     } else {
//       return (
//         <Link href={"/signin"}>
//           <div className="pr-4 pl-4">
//             <div className="xl:text-xl font-bold">Login</div>
//           </div>
//         </Link>
//       );
//     }
//   };

//   return (
//     <header className="w-full h-[70px]">
//       <div className="flex bg-slate-950 text-white h-full items-center">
//         {/* Left */}
//         <div className="flex items-center flex-shrink-0 mx-2 md:mx-4 md:ml-4">
//           <Link href={"/"}>
//             <img
//               className="rounded-md h-[40px] md:h-[50px] max-w-[90px] m-2"
//               src={"../images/logo1.jpg"}
//               alt="logo"
//             />
//           </Link>
//           <div className="pl-2">
//             <div className="sm:text-sm md:text-lg font-bold">D-Kart</div>
//           </div>
//         </div>
//         {/* Middle */}
//         <div className="flex-grow flex items-center mx-5">
//           <Search />
//         </div>
//         {/* Right */}
//         <div className="flex items-center mx-2 md:mx-4">
//           {renderUserButton()}
//         </div>
//       </div>
//     </header>


//   );
// };

// export default Appbar;


"use client"

import { isAuthenticated } from "./productFinalLook/ProductFinalCard"
import axios from "axios"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import Link from "next/link"
import Search from "./Search"
import { Menu, ShoppingCart, User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setCartData, setOrderData, setUserData } from "@/redux/actions"
import { InitialState } from "@/redux/types"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import toast from "react-hot-toast"

const Appbar = () => {
  const [isUserExisted, setIsUserExisted] = useState(false)
  const userData = useSelector((state: InitialState) => state.userData)
  const cartData = useSelector((state: InitialState) => state.cart)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await isAuthenticated()
        if (!response || response.status !== 200) {
          return
        }
        setIsUserExisted(true)
        const user = {
          id: response.data.user.userId,
          username: response.data.user.username,
          email: response.data.user.email,
        }
        dispatch(setUserData(user))

        const CartResponse = await axios.post(`/api/user/cart/get/${response.data.user.userId}`)
        if (CartResponse.status == 404) {
          dispatch(setCartData({
            id: "",
            products: []
          }))
        } else {
          dispatch(setCartData(CartResponse.data))
        }
      } catch (error) {
        console.error('Error while fetching user', error)
      }
    }
    getUserData()
  }, [userData.id, dispatch])

  const logoutHandler = async () => {
    try {
      await axios.get("/api/user/Auth/signout")
      dispatch(setUserData({
        id: "",
        username: "",
        email: ""
      }))
      dispatch(setCartData({
        id: "",
        products: []
      }))
      toast.success("Log Out Successfully")
      window.location.href = "/"
    } catch (error: any) {
      console.error('Error during logout', error)
    }
  }

  const renderUserButton = () => {
    if (isUserExisted && userData) {
      const userInitial = userData.username?.charAt(0).toUpperCase()
      return (
        <div className="flex items-center space-x-4">
          <Link href="/checkout">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartData.products.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartData.products.length}
                </span>
              )}
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userData.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Personal Info
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/order")}>
                My Orders
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logoutHandler}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    } else {
      return (
        <Link href="/signin">
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5 mr-2" />
            Login
          </Button>
        </Link>
      )
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                className="h-8 w-auto mr-2"
                src="../images/logo1.jpg"
                alt="D-Kart logo"
              />
              <span className="font-bold text-xl text-white">D-Kart</span>
            </Link>
          </div>

          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <Search />
          </div>

          <div className="flex items-center">
            <div className="hidden md:block">
              {renderUserButton()}
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="py-4">
                        <Search />
                      </div>
                      <nav className="flex flex-col space-y-4">
                        <Link href="/checkout">
                          <Button variant="ghost" className="w-full justify-start">
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Cart
                          </Button>
                        </Link>
                        {isUserExisted ? (
                          <>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/profile")}>
                              Personal Info
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/order")}>
                              My Orders
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={logoutHandler}>
                              Log Out
                            </Button>
                          </>
                        ) : (
                          <Link href="/signin">
                            <Button variant="ghost" className="w-full justify-start">
                              <User className="h-5 w-5 mr-2" />
                              Login
                            </Button>
                          </Link>
                        )}
                      </nav>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Appbar