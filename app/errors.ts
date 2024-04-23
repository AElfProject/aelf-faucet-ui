import { ZodError } from "zod";

export const handleError = (err: unknown) => {
  if (err instanceof ZodError) {
    const message = err.errors[0].message;
    return { message, isSuccess: false, code: 0 };
  }

  return { message: "Unknown error", isSuccess: false, code: 0 };
};
