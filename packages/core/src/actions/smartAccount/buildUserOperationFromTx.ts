import {
  type Chain,
  type Client,
  type SendTransactionParameters,
  type Transport,
} from "viem";
import type { SmartContractAccount } from "../../account/smartContractAccount.js";
import { isBaseSmartAccountClient } from "../../client/isSmartAccountClient.js";
import { AccountNotFoundError } from "../../errors/account.js";
import { IncompatibleClientError } from "../../errors/client.js";
import { TransactionMissingToParamError } from "../../errors/transaction.js";
import type {
  UserOperationOverrides,
  UserOperationStruct,
} from "../../types.js";
import { filterUndefined } from "../../utils/index.js";
import { buildUserOperation } from "./buildUserOperation.js";

/**
 *  Allows a user operation to be constructed from a traditional transaction object
 *
 * @param client the client to use to build the user operation
 * @param args an ethereum transaction object
 * @param overrides overrides to apply to the user operation
 * @param context optional context parameter used by the middleware
 * @returns a user operation built from the transaction parameters
 */
export const buildUserOperationFromTx: <
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends SmartContractAccount | undefined =
    | SmartContractAccount
    | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TContext extends Record<string, any> | undefined =
    | Record<string, any>
    | undefined
>(
  client: Client<Transport, TChain, TAccount>,
  args: SendTransactionParameters<TChain, TAccount, TChainOverride>,
  overrides?: UserOperationOverrides,
  context?: TContext
) => Promise<UserOperationStruct> = async (
  client,
  args,
  overrides,
  context
) => {
  const { account = client.account, ...request } = args;
  if (!account || typeof account === "string") {
    throw new AccountNotFoundError();
  }

  if (!request.to) {
    throw new TransactionMissingToParamError();
  }

  if (!isBaseSmartAccountClient(client)) {
    throw new IncompatibleClientError(
      "BaseSmartAccountClient",
      "buildUserOperationFromTx",
      client
    );
  }

  const _overrides: UserOperationOverrides = {
    ...overrides,
    maxFeePerGas: request.maxFeePerGas ? request.maxFeePerGas : undefined,
    maxPriorityFeePerGas: request.maxPriorityFeePerGas
      ? request.maxPriorityFeePerGas
      : undefined,
  };
  filterUndefined(_overrides);

  return buildUserOperation(client, {
    uo: {
      target: request.to,
      data: request.data ?? "0x",
      value: request.value ? request.value : 0n,
    },
    overrides: _overrides,
    account: account as SmartContractAccount,
    context,
  });
};
