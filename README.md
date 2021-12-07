## About  
KafeKita is a canteen system based on smart-contracts that can be used for school students to buy canteen products using Crypto,
in this case cUSD stablecoin (Alfajores Celo Network).  

In the future if possible, I will modify this legacy code using ReactJS, fully integrate FileCoin/IPFS, and make the code cleaner for readability.  
If you're interested, just create an issue and fork this repo.

## Guide
1. Download CeloExtensionWallet
2. Create an account on the wallet
3. Go to [Alfajores Faucet](https://celo.org/developers/faucet) to visit test-network faucet and claim some Celo and cUSD
4. Connect your account to this app (visit my public deployed app or run locally on dev mode)
5. Select the desired product
6. Follow the instructions from the web3 wallet, and pay your bill

## Development
The template (TailwindCSS) has been minimized, you will difficult to change the UI.
if you are interested in the web design you can go to the **front-end** branch.
1. Clone this repo
2. Install dependency `npm install` or `yarn`
3. Run local dev `npm run dev` or `yarn dev`

### Image Adapter
Storage Adapter (Hapi.js) => [this repo](https://github.com/khafidprayoga/kafekita-storage-adapter).  
if you are interested in this adapter, you can deploy it on 
AWS Lambda or another serverless framework.
### Note
Use Chromium based web browser for best experience.
