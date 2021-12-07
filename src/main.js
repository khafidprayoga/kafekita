import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "ethereum-blockies/blockies.min.js";
import BigNumber from "bignumber.js";

const ERC20_DECIMALS = 18;

let kit;

const connectCeloWallet = async () => {
  if (window.celo) {
    notification("Please approve this DApp to use it.");
    try {
      await window.celo.enable();

      const web3 = new Web3(window.celo);
      kit = newKitFromWeb3(web3);

      const accounts = await kit.web3.eth.getAccounts();
      kit.defaultAccount = accounts[0];
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
window.addEventListener("load", async () => {
  await connectCeloWallet();
  await getCUSDBalance();
});
