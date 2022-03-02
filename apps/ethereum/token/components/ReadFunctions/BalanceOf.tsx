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
	const { Retrieve } = useStorage();
	const [account, setAccount] = useState(address);
	// const { data } = Retrieve(account!);
	const [hidden, setHidden] = useState(false);

	return (
		<Box>
			<h4>Balance Of</h4>
			<p>Get the balance of a provided address</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Get Balance Of'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Button onClick={() => setHidden((p) => !p)}>
								{!address ? 'Connect Wallet' : !hidden ? 'Retrieve Number' : data}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Retrieve;
