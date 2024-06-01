// "use client"
// import { useDispatch, useSelector } from "react-redux";
// import { setCartData, setOrderData, setUserData } from "@/redux/actions";
// import { Cart, CartProduct, InitialState, Order, Product } from "@/redux/types"
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import ProductDetails from "../productFinalLook/ProductDetails";
// import { isAuthenticated } from "../productFinalLook/ProductFinalCard";
// import { Skeleton } from "../ui/skeleton";
// import { ShoppingCartIcon } from "@heroicons/react/24/outline";

// export const CheckOutPage =  () => {

//     // const userData = useSelector((state : InitialState) => state.userData);
//     // console.log(userData);
//     const dispatch = useDispatch();
//     const [CartProduct , setCartProduct] = useState< CartProduct[] | null>(null);
//     const [loading , setLoading ] = useState<boolean>(true);
//     const cartData = useSelector((state : InitialState ) => state.cart)
//     useEffect(() => {
//         const fetchingCartData = async () => {
//             try{
//                 const userDetails = await isAuthenticated();
//                 const userId = userDetails?.data.user.userId;
//                 const CartResponse = await axios.post(`api/cart/get/[userId]/?userId=${userId}`);
//                 dispatch(setCartData(CartResponse.data));
//                 console.log("cart data:",cartData);
//                 setCartProduct( CartResponse.data.products );
//                 setLoading(false);
//             }
//             catch(e){
//                 console.log(e);
//             }
//         };
//         fetchingCartData();
//     } ,[dispatch])
//     const deleteHandler = async (id : string) => {
//         try{
//             console.log(id);
//             const userDetails = await isAuthenticated();
//             const CartResponse = await axios.post(`api/cart/get/[userId]/?userId=${userDetails?.data.user.userId}`);
           
//             const FilteredNewCartData= CartResponse.data.products?.filter((product:CartProduct)=> {
//                 return product.id !== id;
//             });
//             let newCartVAlue = {
//                 id : CartResponse.data.id,
//                 products : FilteredNewCartData
//             }
//             const DeletedResponce = await axios.post(`api/cart/update/[cartId]/?cartId=${CartResponse.data.id}`,newCartVAlue);
//             setCartProduct(FilteredNewCartData);
//         }
//         catch(e){

//         }
//     }
//     const incrementHandler = async (id : string)  => {

//         try{
//             console.log(id);
//             const userDetails = await isAuthenticated();
//             const CartResponse = await axios.post(`api/cart/get/[userId]/?userId=${userDetails?.data.user.userId}`);
//             const quantityUpdatedData = CartResponse.data.products.map((product : CartProduct ) => {
//                 if(product.id === id) {
//                     return {...product, quantity : product.quantity + 1}
//                 }else{
//                     return { ...product };
//                 }
//             })
//             console.log(quantityUpdatedData);
//             let newCartVAlue = {
//                 id : CartResponse.data.id,
//                 products : quantityUpdatedData
//             }
//             const DeletedResponce = await axios.post(`api/cart/update/[cartId]/?cartId=${CartResponse.data.id}`,newCartVAlue);
//             setCartProduct(quantityUpdatedData);
//         }
//         catch(e){

//         }
//     }
//     const decrementHandler = async ( id : string , quantity : number ) => {
//         try{
//             console.log(id);
//             if( quantity === 1 ){
//                 deleteHandler(id);
//             }
//             else{
//                 const userDetails = await isAuthenticated();
//                 const CartResponse = await axios.post(`api/cart/get/[userId]/?userId=${userDetails?.data.user.userId}`);
//                 const quantityUpdatedData = CartResponse.data.products.map((product : CartProduct ) => {
//                     if(product.id === id) {
//                         return {...product, quantity : product.quantity - 1};
//                     }else{
//                         return { ...product };
//                     }
//                 })
//                 console.log(quantityUpdatedData);
//                 let newCartVAlue = {
//                     id : CartResponse.data.id,
//                     products : quantityUpdatedData
//                 }
//                 const DeletedResponce = await axios.post(`api/cart/update/[cartId]/?cartId=${CartResponse.data.id}`,newCartVAlue);
//                 setCartProduct(quantityUpdatedData);
//             }
            
//         }
//         catch(e){

//         }
//     }
 
//   return (
//     <div className="">
//         { !loading && <div className=" bg-amazonclone-background  bg-slate-100 ">
//             <div className="min-w-[1000px] max-w-[1500px] ml-[20%]  ">
//                 <div className="grid grid-cols-8 gap-10 ">
//                 {/* Products */}
//                 <div className="col-span-6 bg-white ">
//                     <div className="text-2xl xl:text-5xl text-slate-800 font-sans font-bold m-4 flex justify-center hover:scale-110 transition-all">
//                         <ShoppingCartIcon className="h-[50px] text-yellow-600"/>
//                         <div className="">
//                             Cart
//                         </div>
//                     </div>
//                     {CartProduct && CartProduct.map((product : CartProduct) => {
                        
//                     return (
//                         <div className="mt-10" key={product.id}>
//                         <div className="grid grid-cols-12 h-[300px]">
//                             <div className="col-span-10 grid grid-cols-8 divide-y divide-gray-400">
//                             <div className="col-span-4 xl:col-span-2">
//                                 <Link href={`/`}>
//                                     <img
//                                         className="p-4 m-auto ml-3 hover:scale-110 transition-all"
//                                         src={product.image}
//                                         alt="Checkout product"
//                                     />
//                                 </Link>
//                             </div>
//                             <div className="col-span-7 xl:col-span-6 flex">
//                                 <div className="font-medium text-black ml-10 mt-2">
//                                     <div className="">
//                                         <div className="text-xl xl:text-2xl  font-semibold text-blue-900">
//                                             {product.product_name}
//                                         </div>
//                                         <div className="max-h-[100px] mt-3 text-md overflow-hidden">
//                                             {product.product_description}
//                                         </div>
//                                         <div>
//                                             <button className="bg-slate-700 w-[150px] h-10 hover:bg-slate-500 text-white font-bold py-2 px-4 border border-black-500 rounded-md mt-3">
//                                                 View More
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                             </div>
//                             </div>
//                             <div className="col-span-3 xl:col-span-2 ml-5" >
//                                     <div>
//                                         <button
//                                             className="text-sm flex xl:text-base font-semibold rounded text-blue-600 mt-2 hover:text-blue-400 cursor-pointer"
//                                             onClick={() => {
//                                                 deleteHandler(product.id );
//                                             }}
//                                         >
//                                             <div>
//                                                 Delete
//                                             </div>
//                                             <div className="mt-1">
//                                                 <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//                                                 </svg>
//                                             </div>
                                           
//                                         </button>
//                                     </div>
//                                 <div className="text-lg xl:text-xl mt-1 mr-4 text-red-700   font-bold hover:text-red-500 cursor-pointer">
//                                     Rs.{product.price}
//                                 </div>
//                                 <div className="mt-3">
                                    
//                                     <div className="grid grid-cols-3 w-20 text-center">
//                                         <button
//                                             className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer hover:bg-gray-500"
//                                             onClick={ () => {
//                                                 decrementHandler(product.id , product.quantity);
//                                             }}
//                                         >
//                                             -
//                                         </button>
//                                         <div className="text-lg xl:text-xl bg-gray-200">
//                                             {product.quantity}
//                                         </div>
//                                         <button
//                                             className="text-xl xl:text-2xl bg-gray-400 hover:bg-gray-500 rounded cursor-pointer"
//                                             onClick={() => {
//                                                 incrementHandler(product.id);
//                                             }}
//                                         >
//                                             +
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         </div>
//                     );
//                     })}
//                     {/* <div className="text-lg xl:text-xl text-right mb-4 mr-4">
//                     Subtotal ({itemsNumber} items):{" "}
//                     <span className="font-semibold">
//                         {GB_CURRENCY.format(subtotal)}
//                     </span>
//                     </div> */}
//                 </div>
//                 {/* Checkout */}
//                 {/* <div className="col-span-2 bg-white rounded h-[250px] p-7">
//                     <div className="text-xs xl:text-sm text-green-800 mb-2">
//                     Your order qualifies for{" "}
//                     <span className="font-bold">FREE DELIVERY</span>. Delivery Details
//                     </div>
//                     <div className="text-base xl:text-lg mb-4">
//                     Subtotal ({itemsNumber} items):{" "}
//                     <span className="font-semibold">
//                         {GB_CURRENCY.format(subtotal)}
//                     </span>
//                     </div>
//                     <button className="btn">Proceed to Checkout</button>
//                 </div> */}
                
//                 </div>
//                 <div className="h-[60px] bg-slate-100 ">
                    
//                 </div>
//             </div>
//             </div>
//             }{
                
//                     loading && 
//                     <div className='h-[550px]'>
//                       <div className='flex justify-center'>
//                         <div className="h-[250px] grid grid-cols-12  mt-1 mb-2 w-[80%]">
//                               <Skeleton className='col-span-3  h-[250px]'>
//                                 <Skeleton className=''/>
//                               </Skeleton>
//                               <Skeleton className='col-span-9  h-[250px]'>
//                                 <Skeleton/>
//                               </Skeleton>
//                         </div>
//                       </div>
//                       <div className='flex justify-center mt-1'>
//                         <div className="h-[250px] grid grid-cols-12  mt-1 mb-2 w-[80%]">
//                               <Skeleton className='col-span-3  h-[250px]'>
//                                 <Skeleton className=''/>
//                               </Skeleton>
//                               <Skeleton className='col-span-9  h-[250px]'>
//                                 <Skeleton/>
//                               </Skeleton>
//                         </div>
//                       </div>
//                     </div>
                  
//             }
//     </div>
//   )
// }
// export default CheckOutPage;




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

export const CheckOutPage =  () => {

    // const userData = useSelector((state : InitialState) => state.userData);
    // console.log(userData);
    const dispatch = useDispatch();
    const [CartProduct , setCartProduct] = useState< CartProduct[] | null>(null);
    const [loading , setLoading ] = useState<boolean>(true);
    const cartData = useSelector((state : InitialState ) => state.cart)
    useEffect(() => {
        const fetchingCartData = async () => {
            try{
                const userDetails = await isAuthenticated();
                const userId = userDetails?.data.user.userId;
                // const CartResponse = await axios.post(`api/cart/get/[userId]/?userId=${userId}`);
                // dispatch(setCartData(CartResponse.data));
                // console.log("cart data:",cartData);
                // setCartProduct( CartResponse.data.products );
                setLoading(false);
            }
            catch(e){
                console.log(e);
            }
        };
        fetchingCartData();
    } ,[dispatch])
    const deleteHandler = async (id : string) => {
        try{
            console.log(id);
            const userDetails = await isAuthenticated();
            const CartResponse = await axios.post(`api/cart/get/[userId]/?userId=${userDetails?.data.user.userId}`);
           
            const FilteredNewCartData= CartResponse.data.products?.filter((product:CartProduct)=> {
                return product.id !== id;
            });
            let newCartVAlue = {
                id : CartResponse.data.id,
                products : FilteredNewCartData
            }
            const DeletedResponce = await axios.post(`api/cart/update/[cartId]/?cartId=${CartResponse.data.id}`,newCartVAlue);
            setCartProduct(FilteredNewCartData);
            dispatch(setCartData(newCartVAlue));
           
        }
        catch(e){

        }
    }
    const incrementHandler = async (id : string)  => {

        try{
            console.log(id);
            const userDetails = await isAuthenticated();
            const CartResponse = await axios.post(`api/cart/get/[userId]/?userId=${userDetails?.data.user.userId}`);
            const quantityUpdatedData = CartResponse.data.products.map((product : CartProduct ) => {
                if(product.id === id) {
                    return {...product, quantity : product.quantity + 1}
                }else{
                    return { ...product };
                }
            })
            console.log(quantityUpdatedData);
            let newCartVAlue = {
                id : CartResponse.data.id,
                products : quantityUpdatedData
            }
            const DeletedResponce = await axios.post(`api/cart/update/[cartId]/?cartId=${CartResponse.data.id}`,newCartVAlue);
            setCartProduct(quantityUpdatedData);
            dispatch(setCartData(newCartVAlue));
        }
        catch(e){

        }
    }
    const decrementHandler = async ( id : string , quantity : number ) => {
        try{
            console.log(id);
            if( quantity === 1 ){
                deleteHandler(id);
            }
            else{
                const userDetails = await isAuthenticated();
                const CartResponse = await axios.post(`api/cart/get/[userId]/?userId=${userDetails?.data.user.userId}`);
                const quantityUpdatedData = CartResponse.data.products.map((product : CartProduct ) => {
                    if(product.id === id) {
                        return {...product, quantity : product.quantity - 1};
                    }else{
                        return { ...product };
                    }
                })
                console.log(quantityUpdatedData);
                let newCartVAlue = {
                    id : CartResponse.data.id,
                    products : quantityUpdatedData
                }
                const DeletedResponce = await axios.post(`api/cart/update/[cartId]/?cartId=${CartResponse.data.id}`,newCartVAlue);
                setCartProduct(quantityUpdatedData);
                dispatch(setCartData(newCartVAlue));
            }
            
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
                    <div className="text-2xl xl:text-5xl text-slate-800 font-sans font-bold m-4 flex justify-center hover:scale-110 transition-all">
                        <ShoppingCartIcon className="h-[50px] text-yellow-600"/>
                        <div className="">
                            Cart
                        </div>
                    </div>
                    {cartData && cartData.products.map((product : CartProduct) => {
                        
                    return (
                        <div className="mt-10" key={product.id}>
                        <div className="grid grid-cols-12 h-[300px]">
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
                            <div className="col-span-3 xl:col-span-2 ml-5" >
                                    <div>
                                        <button
                                            className="text-sm flex xl:text-base font-semibold rounded text-blue-600 mt-2 hover:text-blue-400 cursor-pointer"
                                            onClick={() => {
                                                deleteHandler(product.id );
                                            }}
                                        >
                                            <div>
                                                Delete
                                            </div>
                                            <div className="mt-1">
                                                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </div>
                                           
                                        </button>
                                    </div>
                                <div className="text-lg xl:text-xl mt-1 mr-4 text-red-700   font-bold hover:text-red-500 cursor-pointer">
                                    Rs.{product.price}
                                </div>
                                <div className="mt-3">
                                    
                                    <div className="grid grid-cols-3 w-20 text-center">
                                        <button
                                            className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer hover:bg-gray-500"
                                            onClick={ () => {
                                                decrementHandler(product.id , product.quantity);
                                            }}
                                        >
                                            -
                                        </button>
                                        <div className="text-lg xl:text-xl bg-gray-200">
                                            {product.quantity}
                                        </div>
                                        <button
                                            className="text-xl xl:text-2xl bg-gray-400 hover:bg-gray-500 rounded cursor-pointer"
                                            onClick={() => {
                                                incrementHandler(product.id);
                                            }}
                                        >
                                            +
                                        </button>
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
                <div className="h-[60px] bg-slate-100 ">
                    
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