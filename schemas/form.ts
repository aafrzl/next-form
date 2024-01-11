import { z } from "zod";

export type FormSchema = z.infer<typeof formSchema>;

export const formSchema = z.object({
  name: z.string().min(4).max(50),
  description: z.string().min(4).optional(),
});

