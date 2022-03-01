import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import { ethers } from 'ethers';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { FACTORY_ABI, STORAGE_ABI, FACTORY_ADDRESS } from './constants';
import { createContainer, useContainer } from '@decentology/unstated-next';

type ContractState = ethers.Contract;

function StorageState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, web3Provider, provider } = useEthereum();
	const [factoryContract, setFactoryContract] = useState<ContractState>(
		new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, provider) as ContractState
	);
	const [proxyContract, setProxyContract] = useState<ContractState>();

	const signer = useMemo(async () => {
		return web3Provider?.getSigner();
	}, [web3Provider]);

	useEffect(() => {
		const fetchContract = async () => {
			const proxyAddress = await factoryContract.getProxy(tenantId);
			const proxyCtr = new ethers.Contract(proxyAddress, STORAGE_ABI, provider);
			const accountSigner = await signer;
			if (accountSigner) {
				setProxyContract(proxyCtr.connect(accountSigner));
			} else {
				setProxyContract(proxyCtr);
			}
		};
		fetchContract();
	}, [factoryContract, tenantId, provider, signer]);

	const setup = useCallback(async () => {
		const accountSigner = await signer;
		if (accountSigner) {
			const ctr = factoryContract.connect(accountSigner) as ContractState;
			setFactoryContract(ctr);
		}
		// We have a defualt contract that has no signer. Which will work for read-only operations.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signer]);

	const errors = (err: any) => {
		if (!factoryContract?.signer) {
			throw new Error('Please connect your wallet!');
		}

		if (err.code === 4001) {
			throw new Error('You rejected the transaction!');
		}

		throw err;
	};

	useEffect(() => {
		if (web3Provider) {
			setup();
		}
	}, [web3Provider]);

	const checkInstance = useCallback(
		async (account: any) => {
			try {
				const instance = await factoryContract.instance(account);
				return instance;
			} catch (err) {
				return false;
			}
		},
		[factoryContract]
	);

	const createInstance = useCallback(async () => {
		try {
			const createTxn = await factoryContract.createInstance();
			return createTxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [factoryContract]);

	const retrieve = async () => {
		try {
			const number = await proxyContract?.retrieve();
			return number.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const store = async (num: number) => {
		try {
			const numbertxn = await proxyContract?.store(num);
			return numbertxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	return {
		tenantId,
		factoryContract,
		proxyContract,
		CheckInstance: () =>
			useQuery(
				['checkInstance', address, factoryContract?.address],
				() => checkInstance(address),
				{
					enabled: !!address && !!factoryContract?.address,
				}
			),
		NewInstance: (
			options?: Omit<UseMutationOptions<unknown, unknown, void, unknown>, 'mutationFn'>
		) => useMutation(createInstance, options),
		Retrieve: () =>
			useQuery(['retrieve', address], () => retrieve(), {
				enabled: !!proxyContract?.signer && !!address,
			}),
		Store: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { num: number }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ num }) => store(num), options),
	};
}

export const Storage = createContainer(StorageState);

export function useStorage() {
	return useContainer(Storage);
}
