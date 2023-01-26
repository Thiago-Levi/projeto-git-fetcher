const form = document.querySelector("form");

const btnRefresh = document.querySelector(".refresh-button");
const newRootContainer = document.querySelector(".new-root-container");
const rooContainer = document.querySelector(".root-containers");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target.inputSearch.value;

  rooContainer.classList.toggle("display-none");
  newRootContainer.classList.toggle("display-none");

  form.reset();
});

btnRefresh.addEventListener("click", (event) => {
  rooContainer.classList.toggle("display-none");
  newRootContainer.classList.toggle("display-none");
});
