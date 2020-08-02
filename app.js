const btnHeader = document.getElementById("btn-header");
const form = document.querySelector(".myform");
const formButtons = document.querySelector(".myspan");
const btnCancel = document.getElementById("btn-cancel");
const btnOk = document.getElementById("btn-ok");
const headerArea = document.querySelector("#header");
const databaseTitleArea = document.querySelector("#database");
const userInputs = document.querySelectorAll("input");
const listContainer = document.getElementById("list-container");
const cities = [];

function clearCityInputs() {
  userInputs[0].value = "";
  userInputs[1].value = "";
  userInputs[2].value = "";
  userInputs[3].value = 50;
}

function AppearCityCard() {
  form.classList.toggle("visible");
  formButtons.classList.toggle("visible");
  headerArea.classList.toggle("opaque");
  databaseTitleArea.classList.toggle("opaque");
  listContainer.classList.toggle("opaque");
  clearCityInputs();
}

function addCityToList(
  idValue,
  nameValue,
  urlValue,
  descriptionValue,
  ratingValue
) {
  const newCityInList = document.createElement("li");
  newCityInList.className = "city-element";
  newCityInList.innerHTML = `
  <div class="city-image">
    <img src="${urlValue}" alt="${nameValue}">
  </div>
  <div class="city-info">
  <h3>${nameValue}</h3>
  <h4> ${ratingValue}/100</h4>
  <h5>Remove Card</h5>
  </div>
  <div class="description-container">
  <h3 class="description">Description</h3>
  <p>${descriptionValue}</p>
  </div>
  `;
  const listRoot = document.getElementById("my-list");
  listRoot.append(newCityInList);
  naming(idValue);
}
function addCity() {
  const nameValue = userInputs[0].value;
  const urlValue = userInputs[1].value;
  const descriptionValue = userInputs[2].value;
  const ratingValue = userInputs[3].value;

  if (
    nameValue.trim() === "" ||
    urlValue.trim() === "" ||
    descriptionValue.trim() === ""
  ) {
    alert("Please enter a City Name, a Valid URL, and a Description");
    return;
  }
  const newCity = {
    id: Math.random().toString(),
    name: nameValue,
    image: urlValue,
    description: descriptionValue,
    rating: ratingValue,
  };
  cities.push(newCity);
  addCityToList(
    newCity.id,
    newCity.name,
    newCity.image,
    newCity.description,
    newCity.rating
  );
  updateUI();
  AppearCityCard();
}
function naming(idValue) {
  addingEventListenersToH5(idValue);
}

function updateUI() {
  if (cities.length === 0) {
    databaseTitleArea.style.display = "block";
  } else {
    databaseTitleArea.style.display = "none";
  }
}

function addingEventListenersToH5(cityId) {
  const h5 = document.querySelectorAll("h5");
  for (let i = 0; i < h5.length; i++) {
    if (i === h5.length - 1) {
      h5[i].addEventListener("click", deleteCity.bind(null, cityId));
    }
  }
}
function deleteCity(cityId) {
  let cityIndex = 0;
  for (let city of cities) {
    if (city.id === cityId) {
      break;
    }
    cityIndex++;
  }
  if (confirm("Do you really want to delete this item?")) {
    cities.splice(cityIndex, 1);
    const listRoot = document.getElementById("my-list");
    listRoot.children[cityIndex].remove();
    updateUI();
  }
}

btnHeader.addEventListener("click", AppearCityCard);
btnCancel.addEventListener("click", AppearCityCard);
btnOk.addEventListener("click", addCity);
