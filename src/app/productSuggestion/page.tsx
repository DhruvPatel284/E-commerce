"use client";
import { useRouter,useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react"; // Corrected useState import
import { Product } from "@/components/homepage/HomePage"; // Assuming correct path
import axios from "axios";
import Link from "next/link"; // Corrected Link import
import ProductDetails from '@/components/ProductDetails';
const ProductSuggestion = () => {
    const searchParams = useSearchParams()
    const router = useRouter();
    const searchTerm = searchParams.get('searchTerm')

    const [products, setProducts] = useState<Product[]>([]);
    const [backupData, setBackupData] = useState<Product[]>([]);
    const fetchData = async () => {
        try {
            const response = await axios.get<Product[]>('/api/product/getProduct');
            const results = response.data.filter((product) =>
                product.product_name.toLowerCase().includes(searchTerm?.toLowerCase()||"")
              );
              setProducts(results);
            
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchTerm]);

    useEffect(()=>{
        console.log("hello");
        console.log(searchTerm);
    },[])

    return (
        <div className="min-w-[1200px] max-w-[1300px] m-auto pt-4">
      {products &&
        products.map((product, key) => {
          return (
            <Link key={key} href={`/product/${product.id}`}>
              <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-1 ">
                <div className="col-span-2 p-4 bg-gray-200">
                  <img
                    className="m-auto"
                    src={product.image}
                    alt="Search result product"
                  />
                </div>
                <div className="col-span-10 bg-gray-50 border border-gray-100 hover:bg-gray-100 ">
                  <div className="font-medium text-black p-2">
                    <ProductDetails product_name={product.product_name} product_category={product.Category.name} />
                    <div className="text-xl xl:text-2xl pt-1">
                        Rs.{product.price}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
    );
};

export default ProductSuggestion;
