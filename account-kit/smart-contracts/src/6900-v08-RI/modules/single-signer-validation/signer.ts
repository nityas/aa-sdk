import type { SmartAccountSigner } from "@aa-sdk/core";
import {
  hashMessage,
  hashTypedData,
  type Hex,
  type SignableMessage,
  type TypedData,
  type TypedDataDefinition,
  type Chain,
} from "viem";

import { packSignature, DEFAULT_OWNER_ENTITY_ID } from "../../utils.js";
import { Meta } from "./module.js";

export const singleSignerMessageSigner = <
TSigner extends SmartAccountSigner
>(
  signer: TSigner,
  chain: Chain
) => {
  return {
    getDummySignature: (): Hex => {

      const dummyEcdsaSignature = "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
      
      return packSignature({
        validationModule: Meta.addresses[chain.id],
        entityID: DEFAULT_OWNER_ENTITY_ID,
        isGlobal: true, // todo: make this user-configurable
        orderedHookData: [],
        validationSignature: dummyEcdsaSignature,
      });
    },

    signUserOperationHash: (uoHash: `0x${string}`): Promise<`0x${string}`> => {
      return signer.signMessage({ raw: uoHash }).then((signature: Hex) => packSignature({
        validationModule: Meta.addresses[chain.id],
        entityID: DEFAULT_OWNER_ENTITY_ID,
        isGlobal: true, // todo: make this user-configurable
        orderedHookData: [],
        validationSignature: signature,
      }));
    },

    // TODO: we can't implement these methods yet, because the RI at `alpha.0` doesn't have a wrapping type,
    // and viem doesn't support raw signing, only via EIP-191 or EIP-712.
    // When we do implement this, we need to prefix the data with the validation module address & entityId.

    signMessage({
      message,
    }: {
      message: SignableMessage;
    }): Promise<`0x${string}`> {
      return signer.signMessage({ raw: hashMessage(message) });
    },

    signTypedData: <
      const typedData extends TypedData | Record<string, unknown>,
      primaryType extends keyof typedData | "EIP712Domain" = keyof typedData
    >(
      typedDataDefinition: TypedDataDefinition<typedData, primaryType>
    ): Promise<Hex> => {
      return signer.signMessage({ raw: hashTypedData(typedDataDefinition) });
    },
  };
};
