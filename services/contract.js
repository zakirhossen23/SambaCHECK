import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import ERC721Singleton from './ERC721Singleton';

// Initializing contract
async function initContract() {
  try {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org");
        const signer = new ethers.Wallet("73e6d3c8393221a8424e4def114864f756763f3bb406c4c0869e5d104ff58d33", provider);
        window.accountId = signer.address;
        window.contract = await ERC721Singleton(signer);
      } catch (error) {
        console.error(error);
      }
    };  
    fetchData();
  } catch (error) {
    console.error(error)
  }
 
}

if (typeof window !== "undefined") {
  if (window?.ethereum !== "undefined")
  window.InitPromise = initContract()  
}
// export default null;