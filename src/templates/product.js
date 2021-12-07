import BigNumber from "bignumber.js";

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
    <h5 class="font-semibold">$${BigNumber(_product.price)
      .shiftedBy(-18)
      .toFixed(1)}</h5>
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
export { productTemplate };
