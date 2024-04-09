import type { Chain } from "viem";

/**
 *
 * @returns
 */
export const defineAlchemyChain = ({
  chain,
  rpcBaseUrl,
}: {
  chain: Chain;
  rpcBaseUrl: string;
}): Chain => {
  return {
    ...chain,
    rpcUrls: {
      ...chain.rpcUrls,
      alchemy: {
        http: [rpcBaseUrl],
      },
    },
  };
};
