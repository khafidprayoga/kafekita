import "./tailwind.css";
import "ethereum-blockies/blockies";

const products = [
  {
    id: 0,
    name: "Lemonice",
    imageURL:
      "https://bafybeibhyjof4pkotj6ipmoidjxeip7xupm7g6zl3r6mcmclcm7zu2y4te.ipfs.dweb.link/1638417959956-937-7b483f5889d128e8",
    description: `Fit for you who are thirsty after exercise, with a blend of ice from Antarctica + Lemonice.`,
    price: 3,
    sold: 10,
  },
  {
    id: 1,
    name: "Javanesso",
    imageURL:
      "https://bafybeieuqiteflq5awbur3xx47yek5idqyjxzjsaqdenhgsl7ratttvyr4.ipfs.dweb.link/1638418018770-937-8bf78859b80b03aa",
    description: `Have you traveled to Borobudur temple?`,
    price: 5,
    sold: 10,
  },
  {
    id: 2,
    name: "Fruizzy",
    imageURL:
      "https://bafybeiawbzvorjmc5yqxjndpdf4rulh4ivnxj57df3rrhgayknojyrjywa.ipfs.dweb.link/1638418056598-937-818b86762564eb97",
    description: `Have you traveled to Borobudur temple?`,
    price: 5,
    sold: 10,
  },
  {
    id: 3,
    name: "Monggo",
    imageURL:
      "https://bafybeig2fvkrdbwv2dlyxhhwawwge3d4qonfn4zaggbpc4azyyomm3woeu.ipfs.dweb.link/1638418095735-937-f11e1115bd1650dd",
    description: `Tropical fruit`,
    price: 4,
    sold: 0,
  },
  {
    id: 4,
    name: "YogHurt",
    imageURL:
      "https://bafybeicbbtgi2wkpxxeskjd4lbq4a4yqbc5pc4dsiuf5lftyfpfdacl3xi.ipfs.dweb.link/1638418157261-937-a926364639685a8e",
    description: `How about your childhood?`,
    price: 5,
    sold: 100,
  },
  {
    id: 5,
    name: "Chocolatey",
    imageURL:
      "https://bafybeieqkpi4zl4tsp2qhnze25eploz3dbypijegvngx3mkhw223n7o3t4.ipfs.dweb.link/1638418211376-937-a18b4f644f609757",
    description: `I think, its a package manager for Windows.`,
    price: 1,
    sold: 20,
  },
  {
    id: 6,
    name: "Avoicado",
    imageURL:
      "https://bafybeia6db4cnwrv5ox3uo3wco4gyqi7xivg2dg5gon2gvzatj32maek2a.ipfs.dweb.link/1638418264770-937-c14adf9363dd0d68",
    description: `don't run away from the problem`,
    price: 2,
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
    const newDiv = document.createElement("div");
    newDiv.className = "relative card rounded-lg shadow-xl hover:shadow-2xl";
    newDiv.innerHTML = productTemplate(_product);
    document.getElementById("marketplace").appendChild(newDiv);
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
    <h3 class="card-title">${_product.name}</h3>
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
