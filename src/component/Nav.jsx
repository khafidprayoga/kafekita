import React from "react";

class Nav extends React.Component{
  render(){
    return(
      <div class="navbar shadow-lg bg-neutral text-neutral-content rounded-none">
      <div class="flex-1 px-2 ml-10">
        <span class="text-2xl font-bold tracking-widest">KAFEKITA</span>
      </div>
      <div class="flex-none hidden sm:block">
        <button class="btn btn-md rounded-full">
          <a
            href="https://alfajores-blockscout.celo-testnet.org/address/0x0000000000000000000000000000000000000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            0 tx
          </a>
        </button>
      </div>
      <div class="flex-none hidden sm:block">
        <div class="rounded-full text-md">$0 cUSD</div>
      </div>
      <div class="flex-none hidden sm:block">
        <button class="btn btn-md rounded-full">Connect</button>
      </div>
      <div class="flex-none mr-10 ml-5 hidden sm:block">
        <div class="avatar">
          <div id="avatar-container" class="w-10 h-10 rounded-full"></div>
        </div>
      </div>
    </div>
    )
  }
}

export default Nav;