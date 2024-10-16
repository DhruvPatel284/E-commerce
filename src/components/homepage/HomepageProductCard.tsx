
import Link from "next/link";
import { string } from "zod";
export const HomepageProductCard  = ( { id , image , product_name ,price } :  {
  id:string;
  image:string;
  product_name : string;
  price:number;
}   )  => {
  console.log(id)
  return (
    <div className=" w-full sm:w-1/3 md:m-2 md:w-full">
        <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-white shadow-lg">
          <div className="relative mx-3 mt-3 h-60 overflow-hidden rounded-xl" >
            <div className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 flex justify-center">
              <img  className="h-[250px]  flex justify-center" src={image} alt="product image" />
            </div>
                <div className="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">           
            </div>         
          </div>
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-xl tracking-tight text-slate-900 max-h-[30px] overflow-hidden">{product_name}</h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-xl font-bold text-slate-900">Rs.{price}</span>
              </p>
            </div>
            <Link href={`/product/${id}`} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Buy Now</Link>
          </div>
        </div>
    </div>
  )
}
export default HomepageProductCard;