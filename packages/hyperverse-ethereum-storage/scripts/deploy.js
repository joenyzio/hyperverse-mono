const hre = require('hardhat');
const main = async () => {
	const hyperverseAdmin = '0x05DF0a749F733779aa2FA5706C7552b094A7E8B0';
	const Storage = await hre.ethers.getContractFactory('Storage');
	const storage = await Storage.deploy(hyperverseAdmin);
	await storage.deployed();
	console.log(`Storage deployed to: ${storage.address}`);

	const StorageFactory = await hre.ethers.getContractFactory('StorageFactory');
	const storageFactory = await StorageFactory.deploy(storage.address, hyperverseAdmin);
	await storageFactory.deployed();
	console.log('Storage Factory deployed to: ', storageFactory.address);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

runMain();
