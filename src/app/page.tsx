"use client"

import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import bs58 from "bs58";
import { connection, getWallet } from "../shared/lib/const";


const wallets = {
  Wallet_1: new PublicKey('3znuss6HYnj5vYUioPU4j5xA8j1TYNkG1Dzp81cBCkpf'),
  Wallet_2: new PublicKey('EqhmK3AGrwxjD1fMJmcZ6daMD25KXNv4xXFqx19VQtNc'),
}

export default function Home() {
  const [pre, setPre] = useState('')

  const log = (data: any) => setPre(JSON.stringify(data, null, 2))
  const createKey = () => {
    const key = Keypair.generate();
    log({
      public: key.publicKey,
      secret: bs58.encode(key.secretKey),
    })
  }

  const getParsedAcc = async (acc: PublicKey) => {
    console.log(acc);
    
    const res = await connection.getParsedAccountInfo(acc)
    log(res)
  }

  const airdrop = async () => {
    const wallet = await getWallet();
    
    const txId = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL * 2);
    log(txId)
  }

  return (
    <div className="flex min-h-screen py-2">
      <div className="flex flex-col gap-4 p-6 border-r border-gray-400">
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={createKey}
        >
          Create Key
        </button>

        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={airdrop}
        >
          Airdrop
        </button>
      </div>

      <pre className="flex-1 p-6 overflow-y-scroll">
        {Object.keys(wallets).map((k, index) => (
          <h4 
            key={index}
            onClick={getParsedAcc.bind(null, wallets[k as keyof typeof wallets])}
          >
            {k} {wallets[k as keyof typeof wallets].toBase58()}
          </h4>
        ))}

        {pre}
      </pre>
    </div>
  );
}
