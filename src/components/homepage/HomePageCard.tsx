import { Url } from "next/dist/shared/lib/router/router";
import { Product } from './HomePage';
// interface ParamInputs  {
//     title : string,
//     img : string,
//     price : number
// }

const HomePageCard = ({ product_name, image, price } : Product) => {
    return (
      
      <>
      <div className="h-[420px] bg-white z-30 m-3">
        <div className="text-lg xl:text-xl font-semibold ml-4 mt-4">{product_name}</div>
        <div className="h-[300px] m-4">
          <img
            className="h-[100%] w-[100%] object-cover"
            src={image}
            alt="Home card"
          />
        </div>
        <div className="text-xs xl:text-sm text-blue-400 ml-4">{price}</div>
      </div>
      </>
    );
  };
  
  export default HomePageCard;