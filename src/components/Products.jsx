import React from 'react';
import BuyModal from './BuyModal';

class Products extends React.Component {
  render() {
    return (
      <div id="content" className="hidden lg:block">
        <div className="grid grid-cols-3 gap-10 mx-10 my-10">
          <div className="relative card rounded-lg shadow-xl hover:shadow-2xl">
            <div
              className="
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
              <h5>
                <span id="productSoldOut">50</span> sold
              </h5>
            </div>
            <div
              className="
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
              <h5>
                $<span id="productPrice">5</span>
              </h5>
            </div>
            <figure>
              <img
                className="w-full object-center object-cover h-[350px]"
                src="https://bafybeia6db4cnwrv5ox3uo3wco4gyqi7xivg2dg5gon2gvzatj32maek2a.ipfs.dweb.link/1638418264770-937-c14adf9363dd0d68"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">Avocado</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, ipsam tempore earum explicabo expedita officiis saepe dolor minima quis hic maiores ad corporis optio dolores, quasi quaerat modi quia veritatis.
              </p>
            </div>
            <div className="card-action">
              <a href="#buy-modal" className="btn btn-md btn-outline rounded-sm mx-10 mb-10">
                Buy
              </a>
              <BuyModal />
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Products;
