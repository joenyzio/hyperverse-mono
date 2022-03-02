const withTM = require('next-transpile-modules')([
	'@decentology/web3modal',
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-ethereum-storage',
]);

module.exports = withTM({
	reactStrictMode: true,
	images: {
		domains: ['siasky.net', 'fileportal.org'],
	},
});
