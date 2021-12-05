// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './cUSDInterface.sol';

contract KafeKita {
    address internal cUSDTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    cUSDInterface cUSD = cUSDInterface(cUSDTokenAddress);
    uint256 internal totalDrinks = 0;

    struct Drink {
        address payable owner;
        string name;
        string imageURL;
        string description;
        uint256 price;
        uint256 sold;
    }
    mapping(address => uint256) internal totalTX;
    mapping(uint256 => Drink) internal drinks;

    event itemAdded(uint256 _productId, string _name);
    event newUserTX(address _user, uint256 _productId);

    function addItem(
        string memory _name,
        string memory _imageURL,
        string memory _description,
        uint256 _price
    ) public {
        // TODO: only contract/canteen owner can add a new product
        uint256 _maxProductPrice = 5000000000000000000;
        require(
            _price <= _maxProductPrice,
            'Price must be lower than or equal to $5 cUSD'
        );

        uint256 _sold = 0;
        drinks[totalDrinks] = Drink(
            payable(msg.sender),
            _name,
            _imageURL,
            _description,
            _price,
            _sold // by default owner item start selling from 0, to avoid cheating
        );
        emit itemAdded(totalDrinks, _name);
        // after drink inserted to array, we must add total drinks length
        totalDrinks++;
    }

    function buyItem(uint256 _id, uint256 _qty) public payable {
        address drinkOwner = drinks[_id].owner;

        require(
            keccak256(abi.encodePacked(msg.sender)) !=
                keccak256(abi.encodePacked(drinkOwner)),
            'Owner can not buy product minted byself.'
        );

        require(
            cUSD.transferFrom(msg.sender, drinkOwner, drinks[_id].price * _qty),
            'Transfer failed.'
        );

        // add new TX for each transactions
        totalTX[msg.sender]++;
        emit newUserTX(msg.sender, _id);
    }

    function getDrinkDetails(uint256 _id)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        Drink memory drink = drinks[_id];

        return (
            drink.owner,
            drink.name,
            drink.imageURL,
            drink.description,
            drink.price,
            drink.sold
        );
    }

    function getTotalDrinks() public view returns (uint256) {
        // return all product that have been added by canteen owner
        return totalDrinks;
    }

    function getAllTX() public view returns (uint256) {
        // return all user TX for bought a drinks
        return totalTX[msg.sender];
    }
}
