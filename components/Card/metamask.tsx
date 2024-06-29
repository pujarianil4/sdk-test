import React, { useState } from "react";

import Ethereum from "./Ethereum.png";
import { ethers } from "ethers";

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState("");
  const connectwalletHandler = () => {
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    if (window.ethereum) {
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountChangedHandler(provider.getSigner());
      });
    } else {
      setErrorMessage("Please Install Metamask!!!");
    }
  };
  const accountChangedHandler = async (newAccount: any) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    const balance = await newAccount.getBalance();
    setUserBalance(ethers.utils.formatEther(balance));
    console.log("balance1", balance);
  };
  const getuserBalance = async (address: any) => {
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const balance = await provider.getBalance(address, "latest");
    console.log("balance2", balance);
  };
  return (
    <div className='WalletCard'>
      <h3 className='h4'>Welcome to a decentralized Application</h3>
      <button
        style={{ background: defaultAccount ? "#A5CC82" : "white" }}
        onClick={connectwalletHandler}
      >
        {defaultAccount ? "Connected!!" : "Connect"}
      </button>
      <div className='displayAccount'>
        <h4 className='walletAddress'>Address:{defaultAccount}</h4>
        <div className='balanceDisplay'>
          <h3>Wallet Amount: {userBalance}</h3>
        </div>
      </div>
      {errorMessage}
    </div>
  );
};
export default WalletCard;
