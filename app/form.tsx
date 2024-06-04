"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getToken } from "./actions";
import { TMessageResult } from "./validation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EChoices } from "./types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState: TMessageResult = {
  message: "",
  isSuccess: true,
  code: 0,
};

function SubmitButton({ choice }: { choice: EChoices }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type="submit"
      aria-disabled={pending}
    >
      Get {choice === EChoices.ELF ? "Tokens" : "Seed"}
    </button>
  );
}

function Form() {
  const [state, formAction] = useFormState(getToken, initialState);
  const [choice, setChoice] = useState<EChoices>(EChoices.ELF);

  const isSeed = choice !== EChoices.ELF;

  return (
    <div className="mx-auto md:w-[800px]">
      <h1 className="text-4xl font-bold text-gray-800">
        AElf Testnet {isSeed ? "Seed" : "Token"} Faucet
      </h1>
      <div className="sm:rounded-md p-6 border border-gray-300 my-4 md:h-[500px] flex flex-col">
        <form action={formAction}>
          <label className="block mb-6">
            <span className="text-gray-700">Your aelf address</span>
            <input
              type="text"
              name="address"
              className=" focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter a valid aelf address here"
            />
          </label>

          <Select onValueChange={(e) => setChoice(e as EChoices)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ELF Token</SelectLabel>
                <SelectItem value={EChoices.ELF}>ELF</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Seed</SelectLabel>
                <SelectItem value={EChoices.TOKEN}>Token Seed</SelectItem>
                <SelectItem value={EChoices.NFT}>NFT Seed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="mb-4"></div>

          <input type="hidden" name="choice" value={choice} />

          <SubmitButton choice={choice} />
          {state.message.length > 0 ? (
            <p
              aria-live="polite"
              role="status"
              className={`px-4 py-3 mt-4 rounded ${
                state?.isSuccess
                  ? "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}
            >
              {state?.message}
            </p>
          ) : null}
        </form>
        <div className="text-sm py-2 mt-auto">
          <p>
            Click &quot;Get {isSeed ? "Seed" : "Tokens"}&quot; to receive the{" "}
            {isSeed ? "test seed" : "100 ELF test tokens"} to try out the aelf
            wallet.
          </p>
          <p>Note:</p>
          <ol className="list-decimal ml-4">
            <li>
              Each aelf Wallet address can only receive test{" "}
              {isSeed ? "seed" : "tokens"} once.
            </li>
            <li>
              {isSeed ? (
                <>
                  The test seed can be used to{" "}
                  <a
                    className="underline underline-offset-4"
                    href="https://doc.portkey.finance/docs/QuickStartGuides/LaunchTokenAndNFTCollection/CreateTokensViaEOAAddress"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    try out token creation on aelf testnet
                  </a>
                  .
                </>
              ) : (
                "The test token can be used to try out the same-chain/cross-chain transfer, resource purchasing, voting, and transaction fee in aelf testnet."
              )}
            </li>
            <li>
              Any test {isSeed ? "seed" : "tokens"} has nothing to do with the
              official {isSeed ? "seed" : "tokens"} and has no value. Please do
              not trade outside of testnet to avoid loss.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Form;
