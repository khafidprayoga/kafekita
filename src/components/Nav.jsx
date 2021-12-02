import React from 'react';

class Nav extends React.Component {
  render() {
    return (
      <div className="navbar shadow-lg bg-neutral text-neutral-content rounded-none">
        <div className="flex-1 px-2 ml-10">
          <span className="text-2xl font-bold tracking-widest">KAFEKITA</span>
        </div>
        <div className="flex-none hidden sm:block">
          <button className="btn btn-md rounded-full">
            <a
              href="https://alfajores-blockscout.celo-testnet.org/address/0x0000000000000000000000000000000000000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              0 tx
            </a>
          </button>
        </div>
        <div className="flex-none hidden sm:block">
          <div className="rounded-full text-md">$0 cUSD</div>
        </div>
        <div className="flex-none hidden sm:block">
          <button className="btn btn-md rounded-full">Connect</button>
        </div>
        <div className="flex-none mr-10 ml-5 hidden sm:block">
          <div className="avatar">
            <div id="avatar-container" className="w-10 h-10 mask mask-circle" />
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
