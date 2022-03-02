import { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useStorage } from '@decentology/hyperverse-ethereum-storage';
import { toast } from 'react-toastify';
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

const Storage = () => {
	const { address } = useEthereum();
	// const { Storage } = useStorage();
	// const { mutate, error } = Transfer();
	// const [receiver, setReceiver] = useState('');
	// const [amount, setAmount] = useState(0);

	const [err, setErr] = useState('');

	// const createNewInstance = async () => {
	// 	try {
	// 		const instanceData = {
	// 			to: receiver,
	// 			value: amount,
	// 		};

	// 		mutate(instanceData);
	// 	} catch (error) {
	// 		console.log('e', error);
	// 		throw error;
	// 	}
	// };

	// useEffect(() => {
	// 	if (error) {
	// 		console.log(error);
	// 		if (error instanceof Error) {
	// 			toast.error(error.message, {
	// 				position: toast.POSITION.BOTTOM_CENTER,
	// 			});
	// 		}
	// 	}
	// }, [err]);

	return (
		<Box>
			<h4>Set number</h4>
			<p>Set a number for storage</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Store number'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								type="number"
								min="0"
								placeholder="Amount to transfer"
								onChange={(e) => setStorage(e.currentTarget.valueAsNumber)}
							/>
							{/* <Button onClick={createNewInstance}>
								{!address ? 'Connet Wallet' : 'Transfer'} */}
							{/* </Button> */}
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Storage;
