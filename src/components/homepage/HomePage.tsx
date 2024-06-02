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
  product_description:string;
  Category: Category;
  quantity:number;
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
