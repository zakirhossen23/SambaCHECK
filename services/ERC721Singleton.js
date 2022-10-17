import Web3 from 'web3'

import erc721 from '../contracts/deployments/celo_alfajores/CeloERC721.json';

export default function ERC721Singleton() {
	let web3 = null;
	if ( window.localStorage.getItem('login-type') !== "metamask"){
		web3 = new Web3("https://alfajores-forno.celo-testnet.org");
		web3.eth.accounts.wallet.add("73e6d3c8393221a8424e4def114864f756763f3bb406c4c0869e5d104ff58d33"); //Adding private key
	}else{
		web3 = new Web3(window.ethereum);
	}

	// create an instance of the KeyManager
	const myKM = new web3.eth.Contract(erc721.abi, erc721.address).methods
  
	return myKM
  }
  