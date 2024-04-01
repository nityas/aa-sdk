import {
  takeBytes,
  type Hex,
  type SmartAccountSigner,
  type SmartContractAccount,
  type UserOperationRequest,
} from "@alchemy/aa-core";
import {
  concat,
  fromHex,
  hexToBigInt,
  pad,
  recoverAddress,
  size,
  toHex,
  type Chain,
  type Client,
  type PublicActions,
  type PublicRpcSchema,
  type Transport,
  hashMessage,
} from "viem";
import { type Signature, type SignerType } from "./types.js";

type GetSignerTypeParams<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends SmartContractAccount | undefined =
    | SmartContractAccount
    | undefined,
  TClient extends Client<
    TTransport,
    TChain,
    TAccount,
    PublicRpcSchema,
    PublicActions
  > = Client<TTransport, TChain, TAccount, PublicRpcSchema, PublicActions>
> = {
  signer: SmartAccountSigner<any>;
  signature: Hex;
  client: TClient;
};

export const getSignerType = async <
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined
>({
  client,
  signature,
  signer,
}: GetSignerTypeParams<TTransport, TChain>): Promise<SignerType> => {
  const signerAddress = await signer.getAddress();
  const byteCode = await client.getBytecode({ address: signerAddress });

  return (byteCode ?? "0x") === "0x" && size(signature) === 65
    ? "EOA"
    : "CONTRACT";
};

export const formatSignatures = (signatures: Signature[]) => {
  let eoaSigs: string = "";
  let contractSigs: string = "";
  let offset: bigint = BigInt(65 * signatures.length);
  signatures
    .sort((a, b) => {
      const bigintA = hexToBigInt(a.signer);
      const bigintB = hexToBigInt(b.signer);

      return bigintA < bigintB ? -1 : bigintA > bigintB ? 1 : 0;
    })
    .forEach((sig) => {
      // add 32 to v if the signature covers the actual gas values
      const addV = sig.userOpSigType === "ACTUAL" ? 32 : 0;

      if (sig.signerType === "EOA") {
        let v =
          parseInt(takeBytes(sig.signature, { count: 1, offset: 64 })) + addV;
        eoaSigs += concat([
          takeBytes(sig.signature, { count: 64 }),
          toHex(v, { size: 1 }),
        ]).slice(2);
      } else {
        const sigLen = BigInt(sig.signature.slice(2).length / 2);
        eoaSigs += concat([
          pad(sig.signer),
          toHex(offset, { size: 32 }),
          toHex(addV, { size: 1 }),
        ]).slice(2);
        contractSigs += concat([
          toHex(sigLen, { size: 32 }),
          sig.signature,
        ]).slice(2);
        offset += sigLen;
      }
    });
  return ("0x" + eoaSigs + contractSigs) as `0x${string}`;
};

export type SplitAggregateSignatureParams = {
  aggregatedSignature: Hex;
  threshold: number;
  account: SmartContractAccount;
  request: UserOperationRequest;
};
/**
 * Takes an aggregated signature and threshold and splits it into its components
 *
 * @param aggregatedSignature - aggregated signature containing PVG || maxFeePerGas || maxPriorityFeePerGas || N-1 Signatures || [0, N-1] Contract Data
 * @param threshold - the account's required threshold of signatures
 */
export const splitAggregatedSignature = async ({
  aggregatedSignature,
  threshold,
  account,
  request,
}: SplitAggregateSignatureParams): Promise<{
  upperLimitPvg: Hex;
  upperLimitMaxFeePerGas: Hex;
  upperLimitMaxPriorityFeePerGas: Hex;
  signatures: Signature[];
}> => {
  if (aggregatedSignature.length < 192 + (65 * threshold - 1)) {
    // TODO: create typed error for this
    throw new Error("Invalid aggregated signature");
  }

  // UserOp.sig format:
  // 0-32: upperLimitPreVerificationGas
  // 32-64: upperLimitMaxFeePerGas
  // 64-96: upperLimitMaxPriorityFeePerGas
  // 96-96+n: k signatures, each sig is 65 bytes each (so n = 65 * k)
  // 96+n-: contract signatures if any
  const pvg = takeBytes(aggregatedSignature, { count: 32 });
  const maxFeePerGas = takeBytes(aggregatedSignature, {
    count: 32,
    offset: 32,
  });
  const maxPriorityFeePerGas = takeBytes(aggregatedSignature, {
    count: 32,
    offset: 64,
  });
  const signaturesAndData = takeBytes(aggregatedSignature, {
    offset: 96,
  });

  const signatureHexes = (() => {
    const signatureStr = takeBytes(signaturesAndData, {
      count: 65 * threshold - 1,
    });
    const signatures: Hex[] = [];
    for (let i = 0; i < threshold - 1; i++) {
      signatures.push(takeBytes(signatureStr, { count: 65, offset: i * 65 }));
    }

    return signatures;
  })();

  const signatures: Promise<Signature>[] = signatureHexes.map(
    async (signature): Promise<Signature> => {
      // in RSV, v is the last byte of a 65 byte signature
      const v = BigInt(takeBytes(signature, { count: 1, offset: 64 }));
      const signerType = v === 0n ? "CONTRACT" : "EOA";
      if (signerType === "EOA") {
        // To recover the signer from just the user op and the raw EOA signature, we need to perform an EC recover. The input hash to recover from should be the original user op hash, with the upper limit gas values, wrapped in the standard EIP-191 wrapper format.
        const hash = hashMessage({
          raw: account.getEntryPoint().getUserOperationHash({
            ...request,
            preVerificationGas: pvg,
            maxFeePerGas,
            maxPriorityFeePerGas,
          }),
        });

        return {
          // the signer doesn't get used here for EOAs
          // TODO: nope. this needs to actually do an ec recover
          signer: await recoverAddress({ hash, signature }),
          signature,
          signerType,
          userOpSigType: "UPPERLIMIT",
        };
      }

      const signer = takeBytes(signature, { count: 20, offset: 12 });
      const offset = fromHex(
        takeBytes(signature, { count: 32, offset: 32 }),
        "number"
      );
      const signatureLength = fromHex(
        takeBytes(signaturesAndData, { count: 32, offset }),
        "number"
      );

      return {
        signer,
        signerType,
        userOpSigType: "UPPERLIMIT",
        signature: takeBytes(signaturesAndData, {
          count: signatureLength,
          offset: offset + 32,
        }),
      };
    }
  );

  return {
    upperLimitPvg: pvg,
    upperLimitMaxFeePerGas: maxFeePerGas,
    upperLimitMaxPriorityFeePerGas: maxPriorityFeePerGas,
    signatures: await Promise.all(signatures),
  };
};

export const combineSignatures = ({
  signatures,
  upperLimitMaxFeePerGas,
  upperLimitMaxPriorityFeePerGas,
  upperLimitPvg,
}: {
  upperLimitPvg: Hex;
  upperLimitMaxFeePerGas: Hex;
  upperLimitMaxPriorityFeePerGas: Hex;
  signatures: Signature[];
}) => {
  return concat([
    pad(upperLimitPvg),
    pad(upperLimitMaxFeePerGas),
    pad(upperLimitMaxPriorityFeePerGas),
    formatSignatures(signatures),
  ]);
};
