"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getToken } from "./actions";
import { TMessageResult } from "./validation";
import { useState } from "react";

const initialState: TMessageResult = {
  message: "",
  isSuccess: true,
  code: 0,
};

function SubmitButton({ isSeed }: { isSeed: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type="submit"
      aria-disabled={pending}
    >
      Get {isSeed ? "Seed" : "Tokens"}
    </button>
  );
}

function Form() {
  const [state, formAction] = useFormState(getToken, initialState);
  const [isSeed, setIsSeed] = useState(false);

  return (
    <div className="mx-auto">
      <label className="inline-flex items-center cursor-pointer mb-4">
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">
          Token
        </span>
        <input
          type="checkbox"
          value="seed"
          className="sr-only peer"
          checked={isSeed}
          onClick={(e) => setIsSeed(e.currentTarget.checked)}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Seed
        </span>
      </label>

      <h1 className="text-4xl font-bold text-gray-800">
        AElf Testnet {isSeed ? "Seed" : "Token"} Faucet
      </h1>
      <div className="sm:rounded-md p-6 border border-gray-300 my-4">
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

          <input
            type="hidden"
            name="choice"
            value={isSeed ? "Seed" : "Token"}
          />

          <SubmitButton isSeed={isSeed} />
          {state.message.length > 0 ? (
            <p
              aria-live="polite"
              role="status"
              className={`px-4 py-3 mt-2 rounded ${
                state?.isSuccess
                  ? "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}
            >
              {state?.message}
            </p>
          ) : null}
        </form>
      </div>
      <div className="text-xs py-2">
        <p>
          Click &quot;Get Tokens&quot; to receive the{" "}
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
  );
}

export default Form;
