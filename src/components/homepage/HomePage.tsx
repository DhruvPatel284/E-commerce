"use client";

import HomepageProductCard from "./HomepageProductCard";
import HomePageLamp from "./HomePageLamp";
import { useEffect, useState } from "react";
import axios from "axios";
import CategorywiseProducts from "./CategorywiseProducts"
import toast from "react-hot-toast";

export interface Product {
  id: string;
  image: string;
  product_name: string;
  price: number;
  Category: Category;
}
export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}


const HomePage = () => {

     const[data,setData] = useState([]);

     useEffect(() => {
      const getCategoryData = async () => {
        try {
          const response = await axios.post("/api/category/getCategory");
          setData(response.data);
        } catch (error: any) {
          return new Error("error while fetching the data!!!")
        }
      };
      getCategoryData();
    }, []);

    // useEffect(() => {
    //   console.log(data); // This will log the updated state after it's been set
    // }, [data]);
    
   

  return (
    <div className="bg-slate-100">
      <HomePageLamp children="Ship Shop Shou"/>
      {data &&
        data.map((category: { id: string; name: string; products: Product[] }) => {
             return(
              <CategorywiseProducts key={category.id} title ={category.name} products={category.products} />
             );
        })
      }
    </div>
  );


};

export default HomePage;




// return (
  //   <div className="bg-slate-100">
  //     <HomePageLamp children="Ship Shop Shou"/>
    
  //     <div className="mt-16">
  //       <div className="text-2xl font-bold ml-16 flex">
  //         <svg className="h-8 w-8 shrink-0 fill-gray-600 mr-1 p-1" viewBox="0 0 256 256">
  //             <path
  //                 d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z">
  //             </path>
  //         </svg>
  //           Books
  //         </div>
  //       <div className="h-1 bg-slate-200"></div>
  //           <div className="md:ml-4">
  //               <div className="grid grid-cols-2 md:grid-cols-4">
  //               <HomepageProductCard imgSrc="../images/product_1_small.jpg" productname="Guinness book of world record" price="199"/>
  //                 <HomepageProductCard imgSrc="../images/product_2_small.jpg"productname="simple one pan wonders" price="150"/>
  //                 <HomepageProductCard imgSrc="../images/product_3_small.jpg"productname="The Bullet That Missed" price="229"/>
  //                 <HomepageProductCard imgSrc="../images/product_4_small.jpg"productname="Currious Minds" price="179"/>
  //               </div>
  //           </div>
  //           </div>

  //       <div>
  //         <div className="text-2xl font-bold ml-16 flex">
  //         <svg className="h-8 w-8 shrink-0 fill-gray-600 mr-1 p-1" viewBox="0 0 256 256">
  //             <path
  //                 d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z">
  //             </path>
  //         </svg>
  //           Electronics
  //         </div>
  //         <div className="h-1 bg-slate-200"></div>
  //           <div className="  md:ml-4">
  //               <div className="grid grid-cols-2 md:grid-cols-4">
  //                 <HomepageProductCard imgSrc="../images/product_9_small.jpg" productname="Fire Tv Stick" price="9,999"/>
  //                 <HomepageProductCard imgSrc="../images/product_13_small.jpg"productname="Iphone 14 Pro" price="59,999"/>
  //                 <HomepageProductCard imgSrc="../images/product_11_small.jpg"productname="Ipad pro" price="49,999"/>
  //                 <HomepageProductCard imgSrc="../images/product_12_small.jpg"productname="Coffee Maker" price="4,999"/>
  //               </div>
  //           </div>
  //     </div>
  //   </div>
  // );