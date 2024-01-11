/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Form_userId_name_key" ON "Form"("userId", "name");
