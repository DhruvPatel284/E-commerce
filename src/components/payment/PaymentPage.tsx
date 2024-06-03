
"use client"
import axios from "axios";
import { Activity, ActivityIcon, ActivitySquareIcon } from "lucide-react";
import Link from "next/link";
import { useParams,useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../productFinalLook/ProductFinalCard";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/skeleton";
import toast from "react-hot-toast";
import { UserInfo } from "os";
import { useDispatch,useSelector } from "react-redux";
import { Cart, CartProduct, InitialState, Order } from "@/redux/types"
import { setOrderData } from "@/redux/actions";
interface Product {
  product_name: string;
  product_description: string;
  price: number;
  image: string;
  id: string;
  category: string;
  stock : number;
  quantity : number;
}
interface User {
  id : string;
  email : string;
  phoneno ?: string;
  username ?: string;
  address?: string;   
  pincode?: number;   
  state?: string;     
  city?: string;      
  country?: string;
}
export const PaymentPage = () => {
  const userData = useSelector((state : InitialState) => state.userData);
  const route = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const temp = searchParams.get('quantity');
  const quantity = Number(temp)
  const orderData = useSelector((state : InitialState ) => state.order);
  const dispatch = useDispatch();
  const [ ProductQuantity , setProductQuantity ] = useState<number>(quantity);
  const [ loading , setloading ] = useState<boolean>(true);
  const [ product , setProduct ] = useState<Product>({
    product_name: "",
    product_description: "",
    price: 0,
    image: "",
    id: "",
    category: "",
    stock : 0,
    quantity:quantity

  });
  const [userInfo, setUserInfo] = useState<User>({
    id : "",
    email : "",
    phoneno : "",
    username : "",
    address : "",   
    pincode: 0,   
    state: "",     
    city: "",      
    country: "",
  });

  useEffect(() => {
    const FetchProduct = async () => {
      try{
    
        const userId = userData.id;
        const res = await axios.get(`/api/user/auth/getPersonalInfo/[userId]/?userId=${userId}`);
  
        setUserInfo(res.data.user);

     
        const resp = await axios.post(`/api/product/getProduct/[productId]`,
                {
                    "productId" : params.productId
                  })
        
        setProduct(resp.data);
        setloading(false);
      }
      catch(e){

      }
    }
    FetchProduct();
  }, [])


  const PaymentOnClickHandler = async () => {
    try{
      if ( !userInfo.phoneno ) {
        toast.error("please fill all details")
        route.push("/profile");
      }
      else{
        product.quantity = ProductQuantity;
        const total = product.price*ProductQuantity;
        const response = await axios.post(`/api/order/addOrder`,{
          userId:userInfo.id,
          products:[product],
          total:total,
        })
       
        toast.success("product orderd successfully!!");
        route.push("/order")
      }  
    }
    catch(e){
      toast.error("product order failed!!");
    }
  }


  if (loading) {
    return <div className="w-[1000px] ml-[15%]">
      <Skeleton className="h-[200px] mt-5"/>
      <Skeleton className="h-[100px] mt-5"/>
      <Skeleton className="h-[100px] mt-5"/>
      <Skeleton className="h-[100px] mt-5"/>
    </div> 
  }
  return (
    <div>
        <div className=" text-slate-800 text-xl md:text-3xl font-bold flex items-center justify-center mt-6">
            <ActivitySquareIcon className="mr-2"/>Make Payment
        </div>
        
        <div>
          <div>
            <div className="mt-10 w-[1000px] ml-[15%]" key={product.id}>
              <div className="h-[0.1px] bg-slate-800" />
                    <div className="grid grid-cols-12 max-h-[250px]">
                        <div className="col-span-10 grid grid-cols-8 divide-y divide-gray-400">
                        <div className="col-span-4 xl:col-span-2 ">
                            <Link href={`/`}>
                                <img
                                    className="p-4 flex justify-center m-auto h-[200px] hover:scale-110 transition-all"
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
                                    <div className=" mt-3 text-md overflow-hidden h-[190px]">
                                        {product.product_description}
                                    </div>
                                    
                                </div>
                            </div>
                            

                            
                            
                        </div>
                        </div>
                        <div className="col-span-3 xl:col-span-2 ml-5" >
                            <div className="text-lg xl:text-xl mt-4 mr-4 text-red-700   font-bold hover:text-red-500 cursor-pointer">
                                Rs.{product.price}
                            </div>
                            <div className="mt-3">
                                
                                <div className="grid grid-cols-3 w-20 text-center">
                                    <button
                                        className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer hover:bg-gray-500"
                                        onClick={() => {
                                          if( ProductQuantity === 1 ){
                                            toast.error("Can't have Quantity ZERO");
                                          }
                                          else{
                                            setProductQuantity(ProductQuantity - 1);
                                          }
                                          
                                        }}
                                    >
                                        -
                                    </button>
                                    <div className="text-lg xl:text-xl bg-gray-200">
                                        {ProductQuantity}
                                    </div>
                                    <button
                                        className="text-xl xl:text-2xl bg-gray-400 hover:bg-gray-500 rounded cursor-pointer"
                                        onClick={() => {
                                          setProductQuantity(ProductQuantity + 1);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                <div className="w-[1000px] ml-[15%]">
                  <div className="bg-black mt-5 h-[1px]  flex justify-center"></div>
                  <div className="mt-2 flex text-xl font-semibold justify-end  ">
                    Total price :- <div className="text-red-700 ml-5">  Rs. { ProductQuantity*product.price}</div>
                  </div>
                  
                  <div>
                    <div className=" flex flex-col  mt-[70px]">
                      <div className="font-bold text-slate-800 items-center flex justify-center text-xl md:text-3xl">
                            <ActivitySquareIcon className="mr-2"/>
                            Check Informations
                      </div>
                      <div className="flex mt-[70px] text-blue-700 text-md md:text-2xl font-semibold">
                        <div className="">
                          Personal details
                        </div>
                        <Link href={`/profile`} className="ml-[70%]">                  
                            Edit
                        </Link>
                      </div> 
                      <div className="h-[0.1px] bg-slate-800" />
                      <div className="mt-3 text-xl font-semibold">
                        <div className="">
                          Name : {userInfo.username}
                        </div>
                        <div className="">
                          Email : {userInfo.email}
                        </div>
                        <div className="">
                         phone No. : {userInfo.phoneno}
                        </div>
                      </div>
                      <div className="flex text-blue-700 text-md md:text-2xl font-semibold mt-5">
                        <div className="">
                          Location details
                        </div>
                        <Link href={`/profile`} className="ml-[70%]">                  
                            Edit
                        </Link>
                      </div>
                      <div className="h-[0.1px] bg-slate-800" />
                      <div className="mt-3 text-xl font-semibold">
                        <div className="">
                          Country : {userInfo.country}
                        </div>
                        <div className="flex">
                          <div>
                            Address :
                          </div> 
                          <div className="ml-1">
                           {userInfo.address}
                          </div>
                        </div>
                        <div className="">
                          State : {userInfo.state}
                        </div>
                        <div className="">
                         City : {userInfo.city}
                        </div>
                        <div className="">
                         pincode : {userInfo.pincode}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={PaymentOnClickHandler} className="bg-slate-800 h-[50px] w-[20%]  hover:bg-green-700 text-white font-bold py-2 px-4 border text-md md:text-xl border-black-500 rounded-md mt-16 ">
            Complete Payment
          </button>
        </div>
        <div className="h-[200px]" />
    </div>
  )
}
export default PaymentPage;
