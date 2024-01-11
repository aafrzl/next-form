/*
  Warnings:

  - A unique constraint covering the columns `[shareUrl]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Form_shareUrl_key" ON "Form"("shareUrl");
