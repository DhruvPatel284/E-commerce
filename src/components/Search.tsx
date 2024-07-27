import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { string } from "zod";
export interface Product {
    id: string;
    image: string;
    product_name: string;
    price: number;
    Category: Category;
  }
  interface Category {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
  }
  
const Search = () => {
    const [suggestions , setSuggestions ] = useState<string[]>([]);
    const [ searchTerm , setSearchTerm ] = useState<string>();
    const navigate = useRouter();
    const handleSearch = (e:any) => {
        e.preventDefault();
        if( searchTerm ){
            const params = new URLSearchParams({ searchTerm: searchTerm });
            setSuggestions([]);
            navigate.push(`/product?${params.toString()}`);
        }
        else{
            alert("please enter valid Search !");
        }
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get<Product[]>('/api/user/product/getProduct');
            const names = response.data.map(product => product.product_name);
            setSuggestions(names);
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
        };
        fetchData();
      }, [searchTerm]);

  return(
    <div className="w-full md:w-[900px] ml-4 md:ml-16">
        <div className="flex">
            <div className="relative w-full">
            <input 
                type="text" 
                id="search-dropdown" 
                onChange={(e) => setSearchTerm(e.target.value)} 
                value={searchTerm}
                className="block h-[40px] p-2.5 w-full z-20 text-md font-semibold text-gray-950 bg-slate-100 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                placeholder={"Search What you Want.."} 
                required 
            />
            <button 
                type="submit" 
                onClick={handleSearch} 
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-500 rounded-r-lg hover:bg-blue-700"
            >
                <MagnifyingGlassIcon className="h-[27px] m-auto stroke-slate-900" />
            </button>
            {suggestions && (
                <div className="bg-slate-200 rounded-lg text-black  w-full z-40 absolute mt-1">
                {suggestions
                    .filter((suggestion) => {
                    const currentSearchTerm = searchTerm?.toLowerCase();
                    const title = suggestion.toLowerCase();
                    return (
                        currentSearchTerm &&
                        title.startsWith(currentSearchTerm) &&
                        title !== currentSearchTerm
                    );
                    })
                    .slice(0, 10)
                    .map((suggestion) => (
                    <div
                        key={suggestion}
                        onClick={() => setSearchTerm(suggestion)}
                        className="rounded-lg h-[33px] cursor-pointer hover:bg-gray-300"
                    >
                        <div className="ml-5 mt-1 h-[29px]">
                        {suggestion}
                        </div>
                    </div>
                    ))}
                </div>
            )}
            </div>
        </div>
        </div>

  

  )
}
export default Search;