// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Interfaces.sol";

contract KafeKita {

    address internal cUSDTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    cUSDInterface cUSD = cUSDInterface(cUSDTokenAddress);
    uint256 internal totalDrinks = 0;
    uint256 maxProductPrice;
    address internal canteenOwner;

     // set owner when contract is deployed
    constructor(){
        canteenOwner = msg.sender;
        uint cusdOffset = 1000000000000000000;
        maxProductPrice = 5 * cusdOffset;
    }
    
    using SafeMath for uint256;

    struct Drink {
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


    modifier onlyOwner() {
        // gives access to only the owner of the contract owner
        require(msg.sender == canteenOwner);
        _;
    }

     function changeMaxProductPrice(uint price) external onlyOwner {
        /*allows the owner of the contract to modify the max cusd set*/
    
        maxProductPrice = price;
    }

    function addItem(
        string memory _name,
        string memory _imageURL,
        string memory _description,
        uint256 _price
    ) public onlyOwner {
        // only canteen owner is now able to add an item
        require(
            _price <= maxProductPrice,
            "Price must be lower than or equal to the set max cUSD"
        );

        uint256 _sold = 0;
        drinks[totalDrinks] = Drink(
            _name,
            _imageURL,
            _description,
            _price,
            _sold // by default owner item start selling from 0, to avoid cheating
        );
        emit itemAdded(totalDrinks, _name);
        // after drink inserted to array, we must add total drinks length
        totalDrinks.add(1);
    }

    function buyItem(uint256 _id, uint256 _qty) public payable {

        require( msg.sender != canteenOwner,
            "Owner can not buy product minted byself."
        );

        require(
            cUSD.transferFrom(msg.sender, payable(canteenOwner), drinks[_id].price.mul(_qty)),
            "Transfer failed."
        );

        // add new TX for each transactions
        totalTX[msg.sender].add(1);
        // increment drinks bought by user
        drinks[_id].sold.add(_qty);
        emit newUserTX(msg.sender, _id);
    }

    function getDrinkDetails(uint256 _id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        Drink memory drink = drinks[_id];

        return (
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
