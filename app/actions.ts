"use server";

import {
  TMessageResult,
  addressSchema,
  messageResultSchema,
} from "./validation";
import { handleError } from "./errors";

export async function getToken(
  _prevState: TMessageResult,
  formData: FormData
): Promise<TMessageResult> {
  const address = formData.get("address");

  try {
    addressSchema.parse(address);
  } catch (err) {
    return handleError(err);
  }

  const res = await fetch(
    `https://faucet.aelf.dev/api/claim?walletAddress=${address}`,
    { method: "POST" }
  );
  const json = await res.json();

  try {
    const result = messageResultSchema.parse(json);

    return result;
  } catch (err) {
    return handleError(err);
  }
}
