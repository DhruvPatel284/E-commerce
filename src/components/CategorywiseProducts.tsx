import React from 'react'
import { Product } from './HomePage';
import HomepageProductCard from './HomepageProductCard';


const CategorywiseProducts = ({
    title,
    products,
  }: {
    title: string;
    products?: Product[];
  }) => {
   // console.log(products);
    const len = products ? products.length : 0;
    let maxlen = 1;
    if(len >5){
        maxlen = 5;
    }else{
        maxlen = len;
    }
  return (
    <div>
        {products &&
          products.map((product: {id:string ; image:string; product_name : string; price:number}) => {
            
              return (
                <HomepageProductCard
                  key={product.id}
                  image = {product.image}
                  product_name={product.product_name}
                  price={product.price}
                />
              );
            
          })}
    </div>
  )
}

export default CategorywiseProducts