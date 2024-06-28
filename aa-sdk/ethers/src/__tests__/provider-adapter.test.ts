import {
  createSimpleSmartAccount,
  getDefaultSimpleAccountFactoryAddress,
} from "@aa-sdk/core";
import { Wallet } from "@ethersproject/wallet";
import { Alchemy, Network, type AlchemyProvider } from "alchemy-sdk";
import { http } from "viem";
import { polygonMumbai } from "viem/chains";
import { EthersProviderAdapter } from "../../src/provider-adapter.js";
import { convertWalletToAccountSigner } from "../utils.js";

describe("Simple Account Tests", async () => {
  const alchemy = new Alchemy({
    apiKey: "test",
    network: Network.MATIC_MUMBAI,
  });
  // demo mnemonic from viem docs
  const dummyMnemonic =
    "legal winner thank year wave sausage worth useful legal winner thank yellow";
  const signer = Wallet.fromMnemonic(dummyMnemonic);
  const alchemyProvider = await alchemy.config.getProvider();

  it("should correctly sign the message", async () => {
    const provider = await givenConnectedProvider({ alchemyProvider, signer });
    expect(
      await provider.signMessage(
        "0xa70d0af2ebb03a44dcd0714a8724f622e3ab876d0aa312f0ee04823285d6fb1b"
      )
    ).toBe(
      "0xbfe07c95623df55ae939ddf4757563286472ef8c0ebe4b84d5e774a653b7eb67735cb5b63d15bb18510d64a97e6e3001a5f9818f89f2f7f076e559248a7ccf7d1c"
    );
  });
});

const givenConnectedProvider = async ({
  alchemyProvider,
  signer,
}: {
  alchemyProvider: AlchemyProvider;
  signer: Wallet;
}) => {
  const chain = polygonMumbai;

  return EthersProviderAdapter.fromEthersProvider(
    alchemyProvider,
    chain
  ).connectToAccount(
    await createSimpleSmartAccount({
      chain,
      signer: convertWalletToAccountSigner(signer),
      accountAddress: "0x856185aedfab56809e6686d2d6d0c039d615bd9c",
      factoryAddress: getDefaultSimpleAccountFactoryAddress(chain),
      transport: http(`${alchemyProvider.connection.url}`),
    })
  );
};
