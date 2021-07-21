const requestURL = "./json/directory.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    for (let i = 0; i < jsonObject.length; i++) {
      let card = document.createElement("li");
      let h2 = document.createElement("h2");
      let hr = document.createElement("hr");
      let address = document.createElement("div");
      let phone = document.createElement("div");
      let website = document.createElement("div");

      card.setAttribute("class", "company");

      h2.setAttribute("class", "company-name");
      h2.textContent = jsonObject[i].name;

      address.setAttribute("class", "row");
      address.textContent = jsonObject[i].address;

      phone.setAttribute("class", "row");
      phone.textContent = "☎ " + jsonObject[i].phone;

      website.setAttribute("class", "row");
      website.textContent = "🌐 " + jsonObject[i].website;

      card.appendChild(h2);
      card.appendChild(hr);
      card.appendChild(address);
      card.appendChild(phone);
      card.appendChild(website);

      document.querySelector(".business-cards").appendChild(card);
    }
  });

// change view

const grid = document.querySelector(".grid");
const cards = document.querySelector(".business-cards");
grid.addEventListener(
  "click",
  () => {
    cards.classList.add("grid-view");
  },
  false
);

const list = document.querySelector(".list");
list.addEventListener(
  "click",
  () => {
    cards.classList.remove("grid-view");
  },
  false
);
