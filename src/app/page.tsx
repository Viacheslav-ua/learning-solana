"use client"

import { Keypair } from "@solana/web3.js";
import { useState } from "react";
import bs58 from "bs58";

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

  return (
    <div>
      <div>
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-10"
        onClick={createKey}
        >
          Create Key
        </button>
      </div>

      <pre>
        {pre}
      </pre>
    </div>
  );
}
