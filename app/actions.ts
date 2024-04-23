"use server";

import {
  TMessageResult,
  addressSchema,
  choiceSchema,
  messageResultSchema,
} from "./validation";
import { handleError } from "./errors";

export async function getToken(
  _prevState: TMessageResult,
  formData: FormData
): Promise<TMessageResult> {
  const address = formData.get("address");
  const choice = formData.get("choice");

  try {
    const parsedAddress = addressSchema.parse(address);
    const parsedChoice = choiceSchema.parse(choice);

    const res = await fetch(
      `https://faucet.aelf.dev/api/${
        parsedChoice === "Seed" ? "claim-seed" : "claim"
      }?walletAddress=${parsedAddress}`,
      { method: "POST" }
    );
    const json = await res.json();

    const result = messageResultSchema.parse(json);

    return result;
  } catch (err) {
    return handleError(err);
  }
}
