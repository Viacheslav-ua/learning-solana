import { Connection } from "@solana/web3.js";
console.log(process.env.SOL_RPC);

// export const connection = new Connection('https://api.devnet.solana.com', "confirmed");
export const connection = new Connection(process.env.SOL_RPC!, "confirmed");

export const getWallet = async () => {
  
  if ('solana' in window) {
    const solana: any = await window.solana;
    console.log(solana);
    
    solana.connect();
    return solana;
  } else {
    window.open("https://phantom.com/", "_blank");
  }

}