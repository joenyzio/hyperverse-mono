import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useStorage } from '@decentology/hyperverse-ethereum-storage';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
} from '../ComponentStyles';

const CreateInstance = () => {
	const { address } = useEthereum();
	const { NewInstance } = useStorage();
	const { mutate } = NewInstance();
	// const [tokenName, setTokenName] = useState('');
	// const [tokenSymbol, setTokenSymbol] = useState('');
	// const [tokenDecimals, setTokenDecimals] = useState(0);

	const createNewInstance = async () => {
		try {
			const instanceData = {
				account: address,
				// name: tokenName,
				// symbol: tokenSymbol,
				// decimal: tokenDecimals,
			};

			mutate(instanceData);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>New Instance</h4>
			<p>Create your own instance of storage </p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Create Instance'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							{/* <Input
								placeholder="Token Name"
								onChange={(e) => setTokenName(e.target.value)}
							/> */}
							<Button onClick={createNewInstance}>
								{!address ? 'Connet Wallet' : 'Create Instance'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default CreateInstance;
