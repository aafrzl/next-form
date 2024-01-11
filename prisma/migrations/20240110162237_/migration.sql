-- DropForeignKey
ALTER TABLE "FormSubmissions" DROP CONSTRAINT "FormSubmissions_formId_fkey";

-- AddForeignKey
ALTER TABLE "FormSubmissions" ADD CONSTRAINT "FormSubmissions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
