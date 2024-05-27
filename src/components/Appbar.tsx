"use client"
import { isAuthenticated } from "./productFinalLook/ProductFinalCard";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { User } from "@/redux/types";

const Appbar = () => {
  const [isUserExisted, setIsUserExisted] = useState(false);
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await isAuthenticated();
        if (!response || response.status !== 200) {
          return;
        }
        setIsUserExisted(true);
        setUserData(response.data.user);
        console.log("userdata:",userData)
      } catch (error) {
        console.error('Error while fetching user', error);
      }
    };
    getUserData();
  }, []);

  const renderUserButton = () => {
    if (isUserExisted && userData) {
      const userInitial = userData.username?.charAt(0).toUpperCase();
      return (
        <div className="flex items-center space-x-4">
          <Link href={"/checkout"}>
            <div className="flex pr-3 pl-3">
              <ShoppingCartIcon className="h-[48px]" />
            </div>
          </Link>
          <button className="h-10 w-10 flex items-center justify-center bg-gray-700 text-white rounded-full"
          
          >
            {userInitial}
          </button>
        </div>
      );
    } else {
      return (
        <Link href={"/signin"}>
          <div className="pr-4 pl-4">
            <div className="text-xs xl:text-xl font-bold">Login</div>
          </div>
        </Link>
      );
    }
  };

  return (
    <header className="min-w-[1000px] h-[70px]">
      <div className="flex bg-black text-white h-[70px]">
        {/* Left */}
        <div className="flex items-center m-4">
          <Link href={"/"}>
            <img
              className="rounded-md h-[50px] w-[90px] m-2"
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
        <div className="flex items-center m-4">
          {renderUserButton()}
        </div>
      </div>
    </header>
  );
};

export default Appbar;
