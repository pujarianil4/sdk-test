import { sendTransaction } from "@wagmi/core";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { BigNumber } from "bignumber.js";
import { CustomEthers } from "test12_npm_package";
import { parseEther } from "viem";
import { getEthersProvider, getEthersSigner } from "../../ethers/ethers";

export default function Card() {
  const { address } = useAccount();

  const [provider, setProvider] = useState<any>({});
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [txHash, setTxHash] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function convertToBigNumber(number: number) {
    class BigNumber {
      _hex: string;
      _isBigNumber: boolean;
      constructor(hex: any) {
        this._hex = hex;
        this._isBigNumber = true;
      }
    }
    // Determine if the number is a float and scale it to an integer
    const scale = 10 ** 18; // You can adjust the scale as needed
    const scaledNumber = Math.round(number * scale);

    // Ensure the scaled number is a BigInt
    const bigIntNumber = BigInt(scaledNumber);

    // Convert the BigInt to a hexadecimal string
    const hexString = "0x" + bigIntNumber.toString(16);

    // Return the object in the desired format
    return {
      _hex: hexString,
      _isBigNumber: true,
    };
    return new BigNumber(hexString);
  }
  const customethers = new CustomEthers();
  useEffect(() => {
    const provider: any = new ethers.providers.Web3Provider(window?.ethereum);

    // transaction();

    setProvider(provider);
    // accountChangedHandler(provider);
  }, [address]);

  function containsOnlyDigits(str: any) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return str.match(rgx);
  }

  const handleInput = (value: any, input: any) => {
    setTxHash("");
    setMsg("");
    if (input === "amount" && containsOnlyDigits(value)) {
      setAmount(value);
    } else if (input === "toAddress") {
      setToAddress(value);
    }
  };

  const accountChangedHandler = async (pro: any) => {
    try {
      const newAccount = await pro.getSigner();
      const address = await newAccount.getAddress();
      console.log("address", address);

      // setAddress(address);
    } catch (error) {}
  };

  const transaction = async () => {
    try {
      setIsLoading(true);
      const tx: any = {
        to: toAddress,
        value: ethers.utils.parseEther("0.1"),
      };
      // const provider2: any = new customethers.ethers.BrowserProvider(
      //   window?.ethereum
      // );

      // const provider1: any = getEthersProvider();
      // console.log("providers", provider, provider1, tx);

      const add: any = address;
      // // change provider value to test
      const signer1 = customethers.metaMaskSigner(provider, "137", add);
      const signer = await getEthersSigner();
      console.log("signer", tx);

      const hash = await signer1.sendTransaction(tx);
      // const signer1 = await provider.getSigner(address);
      // const signer = await getEthersSigner();
      setIsLoading(false);
      // console.log("signer", signer);
      console.log(hash.hash);
      setAmount("");
      setToAddress("");
      setTxHash(hash.hash);
    } catch (error: any) {
      console.log(error.reason);
      setMsg(error?.reason);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='card'>
        <input
          type='text'
          value={amount}
          placeholder='Enter Amount'
          onChange={(e) => handleInput(e.target.value, "amount")}
        />
        <input
          type='text'
          value={toAddress}
          placeholder='Enter Address'
          onChange={(e) => handleInput(e.target.value, "toAddress")}
        />
        <button onClick={transaction}>
          {isLoading ? "Loading..." : "Send"}
        </button>
        <p className='red'>{msg && msg}</p>
      </div>
      <p className='green'> {txHash && "Transaction Success:" + txHash}</p>
    </div>
  );
}
