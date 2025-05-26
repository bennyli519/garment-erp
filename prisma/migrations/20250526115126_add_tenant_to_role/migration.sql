/*
  Warnings:

  - A unique constraint covering the columns `[code,tenantId]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "roles_code_key";

-- DropIndex
DROP INDEX "roles_name_key";

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "tenantId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_tenantId_key" ON "roles"("code", "tenantId");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
