// seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        userId:"67",
        product_name: 'Product 1',
        product_description: 'Description of Product 1',
        price: 10.99,
        stock:10,
        category:"electronics"
        // Add other fields as needed
      },
      {
        userId:"63",
        product_name: 'Product 2',
        product_description: 'Description of Product 2',
        price: 19.99,
        stock:10,
        category:"fashion"
        // Add other fields as needed
      },
      // Add more products as needed
    ],
  });
}

main()
  .catch((e) => {
    throw e;
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
