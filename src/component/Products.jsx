import React from "react";

class Products extends React.Component{
    render(){
      return (
        <div id="content" class="hidden lg:block">
          <div class="grid grid-cols-3 gap-10 mx-10 my-10">
            <div class="relative card rounded-lg shadow-xl hover:shadow-2xl">
      <div
        class="
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
        <h5>$<span id="productPrice">5</span></h5>
      </div>
      <figure>
        <img
          class="w-full object-center object-cover h-[350px]"
          src="https://images.unsplash.com/photo-1592483648228-b35146a4330c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
        />
      </figure>
      <div class="card-body">
        <h3 class="card-title">Strawberry</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="card-action">
        <button class="btn btn-md btn-outline rounded-sm mx-10 mb-10">
          Buy
        </button>
      </div>
            </div>
            <div class="relative card rounded-lg shadow-xl hover:shadow-2xl">
      <div
        class="
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
        <h5>$<span id="productPrice">5</span></h5>
      </div>
      <figure>
        <img
          class="w-full object-center object-cover h-[350px]"
          src="https://images.unsplash.com/photo-1592483648228-b35146a4330c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
        />
      </figure>
      <div class="card-body">
        <h3 class="card-title">Strawberry</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="card-action">
        <button class="btn btn-md btn-outline rounded-sm mx-10 mb-10">
          Buy
        </button>
      </div>
            </div>
            <div class="relative card rounded-lg shadow-xl hover:shadow-2xl">
      <div
        class="
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
        <h5>$<span id="productPrice">5</span></h5>
      </div>
      <figure>
        <img
          class="w-full object-center object-cover h-[350px]"
          src="https://images.unsplash.com/photo-1592483648228-b35146a4330c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
        />
      </figure>
      <div class="card-body">
        <h3 class="card-title">Strawberry</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="card-action">
        <button class="btn btn-md btn-outline rounded-sm mx-10 mb-10">
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