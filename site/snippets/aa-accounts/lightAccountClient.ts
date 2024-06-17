import { createLightAccountClient } from "@account-kit/smart-contracts";
import { LocalAccountSigner, sepolia } from "@aa-sdk/core";
import { http } from "viem";

export const smartAccountClient = await createLightAccountClient({
  transport: http("RPC_URL"),
  chain: sepolia,
  account: {
    signer: LocalAccountSigner.mnemonicToAccountSigner("OWNER_MNEMONIC"),
  },
});
