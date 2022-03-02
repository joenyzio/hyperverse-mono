import { styled } from '../stitches.config';
import CreateInstance from './WriteFunctions/CreateInstance';
import Retrieve from './ReadFunctions/Retrieve';
import ReadComponent from './ReadComponent';
import Storage from './WriteFunctions/Storage';
import { useStorage } from '@decentology/hyperverse-ethereum-storage';

const Container = () => {
	const { Retrieve, Store } = useStorage();

	const RetrieveReadFunctions = [
		{
			hook: Retrieve(),
			header: 'View number',
			description: 'Get the stored number',
			buttonText: 'View number',
		},
	];

	return (
		<Box>
			<h3>Storage Factory Functions</h3>
			<Section>
				<CreateInstance />
				<ReadComponent
					hook={Retrieve()}
					header="Get Proxy"
					description="Get your proxy contract address"
					buttonText={'Get Instance'}
					isAddress={true}
				/>
			</Section>

			<h3>Storage Functions</h3>
			<Section>
				{RetrieveReadFunctions.map((item) => (
					<ReadComponent
						key={item.header}
						hook={item.hook}
						header={item.header}
						description={item.description}
						buttonText={item.buttonText}
					/>
				))}
				<Storage />
			</Section>
		</Box>
	);
};

export default Container;

const Box = styled('div', {
	display: 'flex',
	overflowY: 'scroll',
	flexDirection: 'column',
	marginTop: '1rem',
	borderRadius: '10px',
	backgroundColor: '$gray100',
	height: '70vh',
	padding: '0 2rem 2rem',
	color: '$blue500',
	'& h3': {
		marginTop: '2rem',
	},
});

const Section = styled('div', {
	marginTop: '1rem',
	display: 'grid',
	gridTemplateColumns: '270px 270px 270px 257px',
	gridGap: '10px',
});
