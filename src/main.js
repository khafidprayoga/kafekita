import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "ethereum-blockies/blockies.min.js";
import "lazysizes";
import { productTemplate } from "./templates/product";
import BigNumber from "bignumber.js";
import kafekitaAbi from "../contracts/KafeKita.abi.json";
import cUSDAbi from "../contracts/cUSDInterface.abi.json";

const ERC20_DECIMALS = 18;
const KafeKitaAddress = "0xa3b48a85DE80D87A014514ac393d3E9f489732CE";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

let kit;
let contract;
let products = [];

const connectCeloWallet = async () => {
  if (window.celo) {
    notification("Please approve this DApp to use it.");
    try {
      await window.celo.enable();

      const web3 = new Web3(window.celo);
      kit = newKitFromWeb3(web3);

      const accounts = await kit.web3.eth.getAccounts();
      kit.defaultAccount = accounts[0];

      contract = new kit.web3.eth.Contract(kafekitaAbi, KafeKitaAddress);
      createUserProfile(kit.defaultAccount);
      notification("Connected");
    } catch (error) {
      notification(`Error: ${error}.`);
    }
  } else {
    notification("Please install the CeloExtensionWallet.");
  }
};

const getCUSDBalance = async () => {
  const walletBalance = await kit.getTotalBalance(kit.defaultAccount);
  const cUSDBalance = walletBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
  document.querySelector("#balance").textContent = cUSDBalance;
};

const notification = (_msg) => {
  document.querySelector("#notification").textContent = _msg;
};

const createUserProfile = (
  _address = "0x0000000000000000000000000000000000000000"
) => {
  let icon = blockies.create({
    seed: _address,
    color: "#999", // to manually specify the icon color, default: random
    bgcolor: "#37cdbe", // choose a different background color, default: random
    spotcolor: "#2aa79b",
    size: 10,
  });
  const parentProfile = document.querySelector("#avatar-container");
  parentProfile.appendChild(icon);
};
const getProducts = async () => {
  const _productsLength = await contract.methods.getTotalDrinks().call();
  const _products = [];
  for (let i = 0; i < _productsLength; i++) {
    let _product = new Promise(async (resolve, reject) => {
      let product = await contract.methods.getDrinkDetails(i).call();
      resolve({
        // id: i,
        owner: product[0],
        name: product[1],
        imageURL: product[2],
        description: product[3],
        price: new BigNumber(product[4]),
        sold: product[5],
      });
    });
    _products.push(_product);
  }
  products = await Promise.all(_products);
  renderDrinks();
};
const renderDrinks = () => {
  document.querySelector("#marketplace").innerHTML = "";
  products.forEach((_product, index) => {
    const newDiv = document.createElement("div");
    newDiv.className = "relative card rounded-lg shadow-xl hover:shadow-2xl";
    newDiv.innerHTML = productTemplate(_product, index);
    document.getElementById("marketplace").appendChild(newDiv);
  });
};
window.addEventListener("load", async () => {
  await connectCeloWallet();
  await getCUSDBalance();
  await getProducts();
});
