"use server";

import { FormState } from "./form";

export async function getToken(_prevState: FormState, formData: FormData) {
  "use server";

  const address = formData.get("address");

  console.log(address);

  const res = await fetch(
    `https://faucet.aelf.dev/api/claim?walletAddress=${address}`,
    { method: "POST" }
  );
  console.log(res);
  const json = await res.json();
  console.log(json);

  return json as {
    isSuccess: boolean;
    code: number;
    message: string;
  };
}
