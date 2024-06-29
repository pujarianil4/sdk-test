import { sendTransaction } from "@wagmi/core";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { wagmiConfig } from "../../pages/_app";
import { CustomEthers } from "test12_npm_package";
import { parseEther } from "viem";
import { getEthersProvider, getEthersSigner } from "../../ethers/ethers";

export default function Card() {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState<any>({});
  const customethers = new CustomEthers();
  useEffect(() => {
    const provider: any = new ethers.providers.Web3Provider(window?.ethereum);

    // transaction();

    setProvider(provider);
    accountChangedHandler(provider);
  }, [address]);

  const accountChangedHandler = async (pro: any) => {
    const newAccount = await pro.getSigner();
    const address = await newAccount.getAddress();
    console.log("address", address);

    setAddress(address);
  };

  const transaction = async () => {
    try {
      const tx = {
        to: "0x52b5B7f92791DED8641aaFD6e87129F8089B8902",
        value: ethers.utils.parseEther("0.1"),
      };
      const provider1: any = new customethers.ethers.BrowserProvider(
        window?.ethereum
      );

      // change provider value to test
      const signer1 = customethers.metaMaskSigner(provider, "137", address);
      const signer = await provider.getSigner();

      await signer.sendTransaction(tx);
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
