
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
        <div className="w-[900px] ">
            <div className="flex">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                <select className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-slate-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                    <option className="inline-flex w-full px-4 py-2 hover:bg-gray-100">
                        Trending Now
                    </option>
                    <option className="inline-flex w-full px-4 py-2 hover:bg-gray-100 ">
                        Deals
                    </option>
                    <option className="inline-flex w-full px-4 py-2 hover:bg-gray-100 ">
                        Fashion
                    </option>
                    <option className="inline-flex w-full px-4 py-2 hover:bg-gray-100">
                        Electronics
                    </option>  
                </select>
                <div className="relative w-full">
                    <input type="text" id="search-dropdown" 
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }} value={searchTerm}
                    className="block h-[40px] p-2.5 w-full z-20 text-md font-semibold text-gray-950 bg-slate-100 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search What you Want.." required />
                    <button type="submit" onClick={handleSearch} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white">
                        <MagnifyingGlassIcon className="h-[27px] m-auto stroke-slate-900" />
                    </button>
                    {
                        suggestions && (
                    <div className="bg-slate-200 rounded-lg text-black w-full z-40 absolute">
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
                                    className="rounded-lg h-[33px]">
                                        <div className="h-[3px] bg-slate-950">
                                            
                                        </div>
                                        <div className="ml-5 mt-1 h-[29px]">
                                            {suggestion}
                                        </div>
                                        
                                    </div>
                                    
                            ))}
                    </div> 
                )
                    }
                </div>
            </div>
        </div>

  )
}
export default Search;
