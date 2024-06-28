import { sendTransaction } from "@wagmi/core";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { wagmiConfig } from "../../pages/_app";
import { CustomEthers } from "test12_npm_package";
import { parseEther } from "viem";
import { getEthersProvider, getEthersSigner } from "../../ethers/ethers";

export default function Card() {
  const { address } = useAccount();
  const customethers = new CustomEthers();
  useEffect(() => {
    console.log(address);
    if (address) {
      // transaction();
    }
  }, [address]);

  const transaction = async () => {
    try {
      const tx = {
        to: "0x52b5B7f92791DED8641aaFD6e87129F8089B8902",
        value: parseEther("0.1"),
      };
      const provider: any = getEthersProvider();
      const signer1 = customethers.metaMaskSigner(provider, "137");
      await signer1.sendTransaction(tx);
      // const signer1 = await provider.getSigner(address);
      // const signer = await getEthersSigner();
      console.log(provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={transaction}>Transaction</button>
    </div>
  );
}
