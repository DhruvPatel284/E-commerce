"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCartData } from "@/redux/actions";
import { Cart, CartProduct, InitialState } from "@/redux/types";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import Image from "next/image";
export const isAuthenticated = async () => {
  try{
      console.log("Is Authenticated")
      const response = await axios.get("/api/user/Auth/getUser");
      return response;
  }
  catch(e){
      console.log(e);
      return ;     
  }
}
interface Product {
  product_name: string;
  product_description: string;
  price: number;
  image: string;
  id: string;
  category: string;
  stock: number;
  quantity?: number;
}

export const ProductFinalCard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const cartData = useSelector((state: InitialState) => state.cart);
  const userData = useSelector((state: InitialState) => state.userData);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.post(`/api/user/product/getProduct/[productId]`, {
          productId: params.productId
        });
        setProduct(response.data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching product data:", e);
        setProduct(null);
        setLoading(false);
        toast.error("Error While Fetching Product");
      }
    };
    fetchProductData();
  }, [params.productId]);

  useEffect(() => {
    const checkIfProductInCart = () => {
      if (cartData && product) {
        const productInCart = cartData.products.some((item: CartProduct) => item.id === product.id);
        setIsInCart(productInCart);
      }
    };
    checkIfProductInCart();
  }, [cartData, product]);

  const handleAddToCart = async () => {
    if (!userData.id) {
      router.push(`/signin`);
      toast.error("You have to login first");
      return;
    }

    if (!product || !product.id) {
      toast.error("Product information is missing");
      return;
    }

    try {
      const productWithQuantity: CartProduct = { ...product, quantity: 1, id: product.id };
      if (cartData.id !== "") {
        await updateCartInDatabase(cartData, productWithQuantity);
      } else {
        await createCartInDatabase(userData.id, productWithQuantity);
      }
      router.push("/checkout");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const createCartInDatabase = async (userId: string, product: CartProduct) => {
    const { data } = await axios.post("/api/user/cart/create", {
      products: [product],
      userId: userId,
    });
    dispatch(setCartData({
      products: [product],
      id: data.id,
    }));
  };

  const updateCartInDatabase = async (currentCart: Cart, newProduct: CartProduct) => {
    const updatedCartData = {
      id: currentCart.id,
      products: [...currentCart.products, newProduct]
    };
    await axios.post(`/api/user/cart/update/${currentCart.id}`, updatedCartData);
    dispatch(setCartData(updatedCartData));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="w-full aspect-square rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-1/3" />
                <div className="flex space-x-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-4">Sorry, we couldn`&apos;`t find the product you`&apos;`re looking for.</p>
        <Button onClick={() => router.push('/')} className="inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="relative group max-w-md mx-auto md:max-w-lg lg:max-w-xl overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.product_name}
                width={500}
                height={500}
                className="w-full h-auto max-h-96 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover"
              />
            </div>
            <div className="space-y-6 lg:sticky lg:top-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.product_name}</h1>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <p className="text-gray-600">{product.product_description}</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500 line-through">₹{(product.price * 1.2).toFixed(2)}</span>
                <span className="text-sm font-semibold text-green-600">20% off</span>
              </div>
              <div className="flex items-center space-x-2">
                
                {product.stock > 0 && (
                  <span className="text-sm text-gray-600">
                    {product.stock} {product.stock === 1 ? 'item' : 'items'} left
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    if (userData.id) {
                      router.push(`/payment/${product.id}?quantity=1`);
                    } else {
                      router.push(`/signin`);
                      toast.error("Login Reccuvire")
                    }
                  }}
                >
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant={isInCart ? "secondary" : "outline"}
                  className="w-full sm:w-auto"
                  onClick={isInCart ? () => router.push(`/checkout`) : handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isInCart ? "View Cart" : "Add to Cart"}
                </Button>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ Free Returns</p>
                <p>✓ Free Delivery</p>
                <p>✓ 2 Year Warranty</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductFinalCard;