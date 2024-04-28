// seed.ts

import  prisma  from "../lib/prismadb";



async function main() {
  try {
    await prisma.product.createMany({
      data: [
        {
          
          product_name: 'Product 1',
          product_description: 'Description of Product 1',
          price: 10.99,
          stock: 10,
          category: "electronics"
          // Add other fields as needed
        },
        {
          
          product_name: 'Product 2',
          product_description: 'Description of Product 2',
          price: 19.99,
          stock: 10,
          category: "fashion"
          // Add other fields as needed
        },
        // Add more products as needed
      ],
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  throw error;
});
