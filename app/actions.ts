"use server";

import { FormState } from "./form";

export async function getToken(_prevState: FormState, formData: FormData) {
  const address = formData.get("address");

  const res = await fetch(
    `https://faucet.aelf.dev/api/claim?walletAddress=${address}`,
    { method: "POST" }
  );
  const json = await res.json();

  return json as {
    isSuccess: boolean;
    code: number;
    message: string;
  };
}
