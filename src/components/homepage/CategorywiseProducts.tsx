import React from 'react'
import { Product } from './HomePage';
import HomepageProductCard from './HomepageProductCard';
import { useEffect } from 'react';


const CategorywiseProducts = ({
    title,
    products,
  }: {
    title: string;
    products: Product[];
  }) => {
    const len = products ? products.length : 0;
    let maxlen = 1;
    if(len >5){
        maxlen = 5;
    }else{
        maxlen = len;
    }
    // useEffect(() => {
    //   console.log(products); // This will log the updated state after it's been set
    // }, [products]);
  return (
    <div>
         <div className="text-2xl font-bold ml-16 flex mt-16 mb-0 pt-16">
          <svg className="h-8 w-8 shrink-0 fill-gray-600 mr-1 p-1" viewBox="0 0 256 256">
               <path
                   d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z">
               </path>
          </svg>
             {title}
           </div>
        <div>
        <div className="md:ml-4">
              <div className="grid grid-cols-2 md:grid-cols-4">
                
        {products &&
          products.map((product: {id:string ; image:string; product_name : string; price:number}) => {
              return (
                <HomepageProductCard
                  key={product.id}
                  id={product.id}
                  product_name={product.product_name}
                  image = {product.image}
                  price={product.price}
                />
              );
            
          })}
          </div>
          </div>
          </div>
    </div>
  )
}

export default CategorywiseProducts