import {
  AlchemyProviderConfigSchema,
  createAlchemyPublicRpcClient,
  createAlchemySmartAccountClientFromExisting,
  type AlchemySmartAccountClient,
  type AlchemySmartAccountClientConfig,
} from "@account-kit/infra";
import {
  accountLoupeActions,
  createMultiOwnerModularAccount,
  multiOwnerPluginActions,
  pluginManagerActions,
  type AccountLoupeActions,
  type CreateMultiOwnerModularAccountParams,
  type LightAccount,
  type MultiOwnerModularAccount,
  type MultiOwnerPluginActions,
  type PluginManagerActions,
} from "@account-kit/smart-contracts";
import type { SmartAccountSigner } from "@aa-sdk/core";
import {
  custom,
  type Chain,
  type CustomTransport,
  type HttpTransport,
  type Transport,
} from "viem";

export type AlchemyModularAccountClientConfig<
  TSigner extends SmartAccountSigner = SmartAccountSigner
> = Omit<
  CreateMultiOwnerModularAccountParams<HttpTransport, TSigner>,
  "transport" | "chain"
> &
  Omit<
    AlchemySmartAccountClientConfig<Transport, Chain, LightAccount<TSigner>>,
    "account"
  >;

export function createModularAccountAlchemyClient<
  TSigner extends SmartAccountSigner = SmartAccountSigner
>(
  params: AlchemyModularAccountClientConfig<TSigner>
): Promise<
  AlchemySmartAccountClient<
    CustomTransport,
    Chain | undefined,
    MultiOwnerModularAccount<TSigner>,
    MultiOwnerPluginActions<MultiOwnerModularAccount<TSigner>> &
      PluginManagerActions<MultiOwnerModularAccount<TSigner>> &
      AccountLoupeActions<MultiOwnerModularAccount<TSigner>>
  >
>;

export async function createModularAccountAlchemyClient(
  config: AlchemyModularAccountClientConfig
): Promise<AlchemySmartAccountClient> {
  const { chain, opts, ...connectionConfig } =
    AlchemyProviderConfigSchema.parse(config);

  const client = createAlchemyPublicRpcClient({
    chain,
    connectionConfig,
  });

  const account = await createMultiOwnerModularAccount({
    transport: custom(client),
    ...config,
  });

  return createAlchemySmartAccountClientFromExisting({
    ...config,
    client,
    account,
    opts,
  })
    .extend(multiOwnerPluginActions)
    .extend(pluginManagerActions)
    .extend(accountLoupeActions);
}