"use client"
import { isAuthenticated } from "./productFinalLook/ProductFinalCard";
import React from 'react'
import { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";

interface Address {
  id: string;         
  address?: string;   
  pincode?: number;   
  state?: string;     
  city?: string;      
  country?: string;   
  userId: string;     
  user: User;        
}

interface User {
  userId : string;
  email : string;
  username ?: string;
}
const ProfilePage = () => {
  const [userData, setUserData] = useState<User>();
  const [addressData,setAddressData] = useState<Address>();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await isAuthenticated();
        if (!response || response.status !== 200) {
          return;
        }
     
        setUserData(response.data.user);
      console.log(userData);
       
      } catch (error) {
        console.error('Error while fetching user', error);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getAddressData = async () => {
      try {
        if (userData?.userId) {
          const response = await axios.get(`/api/user/auth/addressGet/[userId]/?userId=${userData.userId}`);
          setAddressData(response.data);
          console.log(addressData);
        }
      } catch (error) {
        console.error('Error while fetching address', error);
      }
    };
    getAddressData();
  }, [userData]);

  const updateAddressHandler =async () => {
      try {
        const response = await axios.post(`/api/user/auth/addressUpdate/[userId]/?userId=${userData?.userId}`);
        setAddressData(response.data);
      } catch (error) {
        console.error('Error while fetching user', error);
      }
  };
  

  return (
    <div>
       
    </div>
  )
}

export default ProfilePage;