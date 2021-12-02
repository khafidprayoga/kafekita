import React from "react";

class Products extends React.Component{
    render(){
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
          rounded-lg
          top-0
          left-0
          ml-0
          my-2
          w-15
          h-15
        "
      >
        <h5><span id="productSoldOut">50</span> sold</h5>
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
        <h5>$<span id="productPrice">5</span></h5>
      </div>
      <figure>
        <img
          className="w-full object-center object-cover h-[350px]"
          src="https://images.unsplash.com/photo-1592483648228-b35146a4330c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title">Strawberry</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="card-action">
        <button className="btn btn-md btn-outline rounded-sm mx-10 mb-10">
          Buy
        </button>
      </div>
            </div>
            <div className="relative card rounded-lg shadow-xl hover:shadow-2xl">
      <div
        className="
          absolute
          bg-gray-200
          px-3
          py-3
          rounded-lg
          top-0
          left-0
          ml-0
          my-2
          w-15
          h-15
        "
      >
        <h5><span id="productSoldOut">50</span> sold</h5>
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
        <h5>$<span id="productPrice">5</span></h5>
      </div>
      <figure>
        <img
          className="w-full object-center object-cover h-[350px]"
          src="https://images.unsplash.com/photo-1592483648228-b35146a4330c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title">Strawberry</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="card-action">
        <button className="btn btn-md btn-outline rounded-sm mx-10 mb-10">
          Buy
        </button>
      </div>
            </div>
            <div className="relative card rounded-lg shadow-xl hover:shadow-2xl">
      <div
        className="
          absolute
          bg-gray-200
          px-3
          py-3
          rounded-lg
          top-0
          left-0
          ml-0
          my-2
          w-15
          h-15
        "
      >
        <h5><span id="productSoldOut">50</span> sold</h5>
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
        <h5>$<span id="productPrice">5</span></h5>
      </div>
      <figure>
        <img
          className="w-full object-center object-cover h-[350px]"
          src="https://images.unsplash.com/photo-1592483648228-b35146a4330c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title">Strawberry</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="card-action">
        <button className="btn btn-md btn-outline rounded-sm mx-10 mb-10">
          Buy
        </button>
      </div>
            </div>
          </div>
        </div>
      ) 
    }
}

export default Products;