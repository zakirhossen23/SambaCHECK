import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import ERC721Singleton from './ERC721Singleton';

export default function useContract() {
	const [contractInstance, setContractInstance] = useState({
		contract: null,
		signerAddress: null,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const signer = new ethers.Wallet("73e6d3c8393221a8424e4def114864f756763f3bb406c4c0869e5d104ff58d33", "https://alfajores-forno.celo-testnet.org");

				const contract = { contract: null, signerAddress: null };

				contract.contract = ERC721Singleton(signer);

				contract.signerAddress = await signer.getAddress();

				setContractInstance(contract);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return contractInstance;
}