// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./cUSDInterface.sol";

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}


contract KafeKita {
    address internal cUSDTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    cUSDInterface cUSD = cUSDInterface(cUSDTokenAddress);
    uint256 internal totalDrinks = 0;
    using SafeMath for uint;

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
            "Price must be lower than or equal to $5 cUSD"
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
            "Owner can not buy product minted byself."
        );

        require(
            cUSD.transferFrom(msg.sender, drinkOwner, drinks[_id].price * _qty),
            "Transfer failed."
        );

        // add new TX for each transactions
        totalTX[msg.sender]++;
        // increment drinks bought by user
        drinks[_id].sold.add(_qty);
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
