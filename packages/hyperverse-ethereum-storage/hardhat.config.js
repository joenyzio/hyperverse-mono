require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: '0.8.4',
	networks: {
		rinkeby: {
			url: `https://rinkeby.infura.io/v3/0590c303558c42ca852442a8f288c753`,
			accounts: ['19ac3c13d36519d6e1819f0412682ee767d6c8d88d7f1d2c89d617bbcc352fd5'],
		},
	},
};
