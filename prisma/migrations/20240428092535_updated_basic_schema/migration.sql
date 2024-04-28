/*
  Warnings:

  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `OrderItemsSchema` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `products` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OrderItemsSchema" DROP CONSTRAINT "OrderItemsSchema_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItemsSchema" DROP CONSTRAINT "OrderItemsSchema_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropIndex
DROP INDEX "Product_userId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "products" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- DropTable
DROP TABLE "OrderItemsSchema";
