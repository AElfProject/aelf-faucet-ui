"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getToken } from "./actions";

export interface FormState {
  message: string;
  isSuccess: boolean;
  code: number;
}

const initialState: FormState = {
  message: "",
  isSuccess: true,
  code: 0,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type="submit"
      aria-disabled={pending}
    >
      Get Tokens
    </button>
  );
}

function Form() {
  const [state, formAction] = useFormState(getToken, initialState);

  return (
    <div className="md:w-128 md:max-w-full w-full mx-auto">
      <h1 className="text-4xl font-bold text-gray-800">
        AElf Testnet Token Faucet
      </h1>
      <div className="sm:rounded-md p-6 border border-gray-300 my-4">
        <form action={formAction}>
          <label className="block mb-6">
            <span className="text-gray-700">Your aelf address</span>
            <input
              type="text"
              name="address"
              className=" focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full mt-1 border-gray-300 rounded-md shadow-sm"
              placeholder="Enter a valid aelf address here"
            />
          </label>
          <SubmitButton />
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
          Click &quot;Get Test Token&quot; to receive the 50 ELF test token to
          try out the aelf wallet.
        </p>
        <p>Note:</p>
        <ol className="list-decimal ml-4">
          <li>Each aelf Wallet address can only receive test tokens once</li>
          <li>
            The test token can be used to try out the same-chain/cross-chain
            transfer, resource purchasing, voting, and transaction fee in aelf
            testnet.
          </li>
          <li>
            Any test token has nothing to do with the official token and has no
            value. Please do not trade outside of testnet to avoid loss.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Form;
