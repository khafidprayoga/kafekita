import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "ethereum-blockies/blockies.min.js";
import "lazysizes";
import { productTemplate } from "./templates/product";
import kafekitaAbi from "../contracts/KafeKita.abi.json";
import BigNumber from "bignumber.js";
import cUSDAbi from "../contracts/cUSDInterface.abi.json";

const ERC20_DECIMALS = 18;
const KafeKitaAddress = "0xA249816f3ecf2E8aba96Fb0Bc12CEc9731FAc3d8";
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
      notification(`${error}.`);
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

const approve = async (_price) => {
  const cUSDContract = new kit.web3.eth.Contract(cUSDAbi, cUSDContractAddress);
  const bill = await cUSDContract.methods
    .approve(KafeKitaAddress, String(_price))
    .send({ from: kit.defaultAccount });

  return bill;
};

const notification = (_msg) => {
  document.querySelector("#notification").textContent = _msg;
};

const getTX = async () => {
  const totalTX = await contract.methods.getAllTX().call();
  document.querySelector("#user-tx").textContent = totalTX;
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
  await getTX();
});

document
  .querySelector("#marketplace")
  .addEventListener("click", async (event) => {
    if (event.target.className.includes("btn-success")) {
      const btnBuy = event.target.id.split("-");
      const id = Number.parseInt(btnBuy[2]);

      const inputQty = Number.parseInt(
        document.querySelector(`#product-qty-${id}`).value
      );

      const qty =
        inputQty < 1 || inputQty > 10 ? "error" : Number.parseInt(inputQty);

      notification("Waiting for payment approval...");
      if (qty !== "error") {
        try {
          await approve(products[id].price * qty);
          notification(`Awaiting payment for "${products[id].name}"...`);
        } catch (err) {
          notification(`${err}`);
        }

        try {
          const result = await contract.methods
            .buyItem(id, qty)
            .send({ from: kit.defaultAccount });
          if (result) {
            notification(`Processing tx "${products[id].name}" ${qty} item...`);
            await getCUSDBalance();
            await getTX();
            await getProducts();
          }
        } catch (err) {
          notification(`${err}`);
        }
      } else {
        notification("An error occured");
      }
    }
  });
