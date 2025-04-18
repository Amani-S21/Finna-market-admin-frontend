import { signinSchema } from "@/app/validationSchemas";
import { z } from "zod";

export type SigninSchema = z.infer<typeof signinSchema>;
