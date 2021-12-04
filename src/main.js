import "./tailwind.css";
import "ethereum-blockies/blockies";

const products = [
  {
    name: "Avocado",
    imageURL:
      "https://bafybeia6db4cnwrv5ox3uo3wco4gyqi7xivg2dg5gon2gvzatj32maek2a.ipfs.dweb.link/1638418264770-937-c14adf9363dd0d68",
    description: ` Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime odio ex
    distinctio sequi blanditiis? Velit voluptatibus culpa nihil, quis libero
    quas natus incidunt minima repudiandae, autem eaque quae aperiam
    consequatur?`,
    price: 3,
    sold: 10,
  },
];

const getBalance = () => {
  document.querySelector("#balance").textContent = 20;
};

const getTX = () => {
  document.querySelector("#user-tx").textContent = 1;
};
const renderDrinks = () => {
  document.querySelector("#marketplace").innerHTML = "";
  products.forEach((_product) => {
    products.forEach((_product) => {
      const newDiv = document.createElement("div");
      newDiv.className = "relative card rounded-lg shadow-xl hover:shadow-2xl";
      newDiv.innerHTML = productTemplate(_product);
      document.getElementById("marketplace").appendChild(newDiv);
    });
  });
};

const productTemplate = (_product) => {
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
    <h5>$${_product.price}</h5>
  </div>
  <figure>
    <img
      class="w-full object-center object-cover h-[350px]"
      src="${_product.imageURL}"
    />
  </figure>
  <div class="card-body">
    <h3 class="card-title">Strawberry</h3>
    <p>${_product.description}</p>
  </div>
  <div class="card-action">
    <a href="#my-modal" class="btn btn-md btn-outline rounded-sm mx-10 mb-10">
      Buy
    </a>
    <div id="my-modal" class="modal">
      <div class="modal-box">
        <div class="form-control">
          <input
            type="number"
            placeholder="quantity"
            class="input input-lg input-bordered"
          />
        </div>
        <div class="modal-action">
          <a href="#" class="btn btn-success">Buy</a>
          <a href="#" class="btn btn-outline">Cancel</a>
        </div>
      </div>
    </div>
  </div>
`;
};

window.addEventListener("load", () => {
  getBalance();
  getTX();
  renderDrinks();
});
