/*
  Warnings:

  - You are about to drop the `FormSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormSubmission" DROP CONSTRAINT "FormSubmission_formId_fkey";

-- DropTable
DROP TABLE "FormSubmission";

-- CreateTable
CREATE TABLE "FormSubmissions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "FormSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FormSubmissions_formId_idx" ON "FormSubmissions"("formId");

-- AddForeignKey
ALTER TABLE "FormSubmissions" ADD CONSTRAINT "FormSubmissions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
