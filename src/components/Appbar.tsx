"use client"

import  Link  from "next/link";
import Search from "./Search";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Appbar = () => {
  
  return (
    <header className="min-w-[1000px] h-[70px]">
      <div className="flex bg-black text-white h-[70px]">
        {/* Left */}
        <div className="flex items-center m-4">
          <Link href={"/"}>
            <img
              className=" rounded-md h-[50px] w-[90px] m-2"
              src={"../images/logo-ss.png"}
              alt="Amazon logo"
            />
          </Link>
          <div className="pr-4 pl-2">
            <div className="text-sm xl:text-base font-bold">Ship-Shop-Shup</div>
          </div>
        </div>
        {/* Middle */}
        <div className="flex grow relative items-center">
          <Search />
        </div>
        {/* Right */}
        <div className="flex items-center m-4 ">
          <Link href={"/signin"}>
            <div className="pr-4 pl-4">
                <div className="text-xs xl:text-xl font-bold">Login</div>
            </div>
          </Link>    
          <Link href={"/checkout"}>
            <div className="flex pr-3 pl-3">
              <ShoppingCartIcon className="h-[48px]" />
            </div>
          </Link>
        </div>
      </div>
      
    </header>
  );
};

export default Appbar;





