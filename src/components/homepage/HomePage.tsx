"use client"
import HomePageLamp from "./HomePageLamp";

import { useEffect, useState } from "react";
import axios from "axios";
import CategorywiseProducts from "./CategorywiseProducts";
import { number } from "zod";
import Faqs from "../Faqs";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Footer from "../Footer";

interface Product {
  id: string;
  product_name: string;
  product_description ?: string;
  price: number; 
  stock : number;
  image : string;
  createdAt ?: Date         
  updatedAt ?: Date    
  category: String;              
}


const HomePage = () => {
  
  const [ data , setData ] = useState([]);
  useEffect(() => {
    const getCategoryData = async () => {
      try{
        const response = await axios.post("api/user/category/getCategory")
        setData(response.data);
      }
      catch(e){
        return new Error("error while fetching the data!!!")
      }
    }
    getCategoryData();
  },[])

  return (
    <div className="bg-slate-100 ">
      <HomePageLamp className="flex ">
        <div className="flex mb-16">
          <div className="">D-kart</div>
          <div><ShoppingCartIcon className="h-[50px] text-orange-400"/></div>
        </div>
      </HomePageLamp>
      <div>
      <div className="h-[100px]"></div>
      {data &&
        data.map((category: { id: string; name: string; products : Product[] }) => {
             return(
              <CategorywiseProducts key={category.id} title ={category.name} products={category.products} />
             );
        })
      }
    </div>
      <Faqs/>
      <Footer />
    </div>
  );
};

export default HomePage;