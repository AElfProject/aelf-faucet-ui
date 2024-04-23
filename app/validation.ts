import { z } from "zod";

export const messageResultSchema = z.object({
  isSuccess: z.boolean(),
  code: z.number(),
  message: z.string(),
});

export const addressSchema = z
  .string()
  .min(1, { message: "Cannot be empty." })
  .transform((val) => {
    const splitByUnderscore = val.split("_");
    if (splitByUnderscore.length === 3) return splitByUnderscore[1];

    return val;
  });

export const choiceSchema = z.enum(["Seed", "Token"]);

export type TMessageResult = z.infer<typeof messageResultSchema>;
