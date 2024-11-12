"use server";

import {
  TMessageResult,
  addressSchema,
  choiceSchema,
  messageResultSchema,
} from "./validation";
import { handleError } from "./errors";
import { EChoices } from "./types";

export async function getToken(
  _prevState: TMessageResult,
  formData: FormData
): Promise<TMessageResult> {
  const address = formData.get("address");
  const choice = formData.get("choice");
  const captchaToken = formData.get("captchaToken");

  try {
    const parsedAddress = addressSchema.parse(address);
    const parsedChoice: EChoices = choiceSchema.parse(choice);
    const res = await fetch(
      `https://faucet-staging.aelf.dev/api/${
        {
          [EChoices.ELF]: "claim",
          [EChoices.TOKEN]: "claim-seed",
          [EChoices.NFT]: "claim-nft-seed",
        }[parsedChoice]
      }?walletAddress=${parsedAddress}&recaptchaToken=${captchaToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Platform: "FaucetUI", // Add the custom header here
        },
      }
    );
    const json = await res.json();
    const result = messageResultSchema.parse(json);

    return result;
  } catch (err) {
    return handleError(err);
  }
}
