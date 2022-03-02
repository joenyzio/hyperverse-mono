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

const Retrieve = () => {
	const { address } = useEthereum();
	const { Store } = useStorage();
	const [owner, setOwner] = useState('');
	const [number, setNumber] = useState('');
	// const { data, refetch } = Store(owner!, spender!);
	const [hidden, setHidden] = useState(false);

	return (
		<Box>
			<h4>Retrieve</h4>
			<p>Retrieves stored number.</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Get Number'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Value "
								onChange={(e) => setNumber(e.target.value)}
							/>
							<Button
								onClick={() => {
									refetch();
									setHidden((p) => !p);
								}}
							>
								{!address ? 'Connect Wallet' : !hidden ? 'Get Number' : data}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Storage;
