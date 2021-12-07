import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";

const ERC20_DECIMALS = 18;

let kit;

async function connectCeloWallet() {
  if (window.celo) {
    console.log("⚠️ Please approve this DApp to use it.");
    try {
      await window.celo.enable();

      const web3 = new Web3(window.celo);
      kit = newKitFromWeb3(web3);

      const accounts = await kit.web3.eth.getAccounts();
      kit.defaultAccount = accounts[0];
    } catch (error) {
      console.log(`⚠️ ${error}.`);
    }
  } else {
    console.log("⚠️ Please install the CeloExtensionWallet.");
  }
}
window.addEventListener("load", async () => {
  console.log("Init");
  await connectCeloWallet();
});
