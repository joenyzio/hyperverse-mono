// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/IHyperverseModule.sol';

contract Storage is IHyperverseModule {
	address public immutable contractOwner;
	address private tenantOwner;

	uint256 number;

	constructor(address _owner) {
		metadata = ModuleMetadata(
			'Module',
			Author(_owner, 'https://ethereum-storage.netlify.app/'),
			'1.0.0',
			3479831479814,
			'https://ethereum-storage.netlify.app/'
		);
		contractOwner = _owner;
	}

	/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TENANT FUNCTIONALITIES  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	function init(address _tenant) external {
		/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
		tenantOwner = _tenant;
	}
	/**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }
	/**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}