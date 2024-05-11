import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { Product } from "./homepage/HomePage";
import axios from "axios";
const Search = () => {
    const [suggestions, SetSuggestions] = useState<string[]>([]);
      const[searchTerm,setSearchTerm] = useState<string>();
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get<Product[]>('/api/product/getProduct');
            const names = response.data.map(product => product.product_name);
            SetSuggestions(names);
            console.log('Product Names:', names);
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
        };
        fetchData();
      }, []);
  return(
        <div className="w-[900px]">
            <div className="flex">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                <select className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                    <option className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Trending Now
                    </option>
                    <option className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Deals
                    </option>
                    <option className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Fashion
                    </option>
                    <option className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Electronics
                    </option>  
                </select>
                <div className="relative w-full">
                    <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required 
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white">
                        <MagnifyingGlassIcon className="h-[27px] m-auto stroke-white" />
                    </button>
                    { suggestions && (
             <div className="bg-white text-black w-full z-40 absolute">
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
                 >
                   {suggestion}
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