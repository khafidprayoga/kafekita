import "./tailwind.css";
import "ethereum-blockies/blockies";
import "lazysizes";
import { newKitFromWeb3, web3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import kafekitaAbi from "./contracts/KafeKita.abi.json";
import cUSDAbi from "./contracts/cUSDInterface.abi.json";

const ERC20_DECIMALS = 18;
const KafeKitaAddress = "0xa3b48a85DE80D87A014514ac393d3E9f489732CE";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

let kit;
let contract;
let products = [];

const connectCeloWallet = async () => {
  if (window.celo) {
    notification("⚠️ Please approve this dApp to use it.");
    try {
      await window.celo.enable();

      const web3 = new web3(window.celo);
      kit = newKitFromWeb3(web3);

      const accounts = await kit.web3.eth.getAccounts();
      kit.defaultAccount = accounts[0];
      contract = new kit.web3.eth.Contract(kafekitaAbi, KafeKitaAddress);
    } catch (err) {
      notification(`⚠️ ${err}.`);
    }
  } else {
    notification("⚠️ Please install the CeloExtensionWallet.");
  }
};

const getBalance = async function () {
  const totalBalance = await kit.getTotalBalance(kit.defaultAccount);
  const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
  document.querySelector("#balance").textContent = cUSDBalance;
};

const getProducts = async () => {
  const _productsLength = await contract.methods.getTotalDrinks().call();
  const _products = [];
  for (let i = 0; i < _productsLength; i++) {
    let _product = new Promise(async (resolve, reject) => {
      let product = await contract.methods.getDrinkDetails(i).call();
      console.log(product);
      resolve({
        id: i,
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
  renderProducts();
};

const getTX = async () => {
  const userTx = await contract.methods.getAllTX().call();
  document.querySelector("#user-tx").textContent = userTx;
};

const approve = async (_price) => {
  const cUSDContract = new kit.web3.eth.Contract(cUSDAbi, cUSDContractAddress);

  const bill = await cUSDContract.methods
    .approve(KafeKitaAddress, _price)
    .send({ from: kit.defaultAccount });

  return bill;
};
const notification = (_msg) => {
  document.querySelector("#notification").textContent = _msg;
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

const productTemplate = (_product, _id) => {
  return `
  <div
    class="
      absolute
      bg-gray-200
      px-3
      py-3
      rounded-none
      top-0
      left-0
      ml-0
      my-2
      w-15
      h-15
    "
  >
    <h5>${_product.sold} sold</h5>
  </div>
  <div
    class="
      absolute
      bg-gray-200
      px-3
      py-3
      rounded-full
      top-0
      right-0
      mx-2
      my-2
      w-15
      h-15
    "
  >
    <h5 class="font-semibold">$${_product.price}</h5>
  </div>
  <figure>
    <img
      class="lazyload w-full object-center object-cover h-[350px] bg-gray-300"
      data-sizes="auto"
      data-srcset="${_product.imageURL}"
    />
  </figure>
  <div class="card-body">
    <h3 class="card-title">${_product.name}</h3>
    <p>${_product.description}</p>
  </div>
  <div class="card-action">
    <a href="#product-${_id}" class="btn btn-md btn-outline rounded-sm mx-10 mb-10">
      Buy
    </a>
    <div id="product-${_id}" class="modal">
      <div class="modal-box">
        <div class="form-control">
          <input
            id="product-qty-${_id}"
            type="number" min="1" max="10" value="1"
            placeholder="quantity"
            class="input input-lg input-bordered"
          />
        </div>
        <div class="modal-action">
          <a id="buy-product-${_id} "href="#" class="btn btn-success">Buy</a>
          <a href="#" class="btn btn-outline">Cancel</a>
        </div>
      </div>
    </div>
  </div>
`;
};

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

      notification("⌛ Waiting for payment approval...");
      if (qty !== "error") {
        try {
          await approve(products[id].price * qty);
          notification(`⌛ Awaiting payment for "${products[id].name}"...`);
        } catch (err) {
          notification(`${err}`);
        }

        try {
          const result = await contract.methods
            .buyItem(id, qty)
            .send({ from: kit.defaultAccount });
          notification(
            `⌛ Processing tx "${products[id].name}" ${qty} item...`
          );
          renderDrinks();
          await getBalance();
        } catch (err) {}
      } else {
        notification("An error occured");
      }
    }
  });

window.addEventListener("load", async () => {
  notification("Initializing....");
  await connectCeloWallet();
  await getBalance();
  await getProducts();
  await getTX();
  renderDrinks();
});
