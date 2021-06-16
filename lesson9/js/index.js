// Menu Toggle

const menu = document.querySelector(".hamburger");
const navigation = document.querySelector(".nav-items");

menu.addEventListener(
  "click",
  () => {
    navigation.classList.toggle("responsive");
  },
  false
);

window.onresize = () => {
  if (window.innerWidth > 760) navigation.classList.remove("responsive");
};

const burger = document.querySelector(".button");

burger.addEventListener("click", () => {
  if (burger.innerText === "❌") {
    burger.textContent = "🍔 Menu";
  } else {
    burger.textContent = "❌";
  }
});

// Date JS

const currentdate = document.querySelector("#date");

let d = new Date();

let formateddate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
}).format(d);

currentdate.textContent = formateddate;

// Aside

if (d.getDay() == 5) {
  document.querySelector("#banner").style.display = "block";
}

// JSON

const requestURL = "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    //console.table(jsonObject); // temporary checking for valid response and data parsing

    const town = jsonObject["towns"];

    for (let i = 0; i < town.length; i++) {
      if (
        town[i].name == "Preston" ||
        town[i].name == "Fish Haven" ||
        town[i].name == "Soda Springs"
      ) {
        let card = document.createElement("section");
        let h2 = document.createElement("h2");
        let h3 = document.createElement("h3");
        let image = document.createElement("img");
        let yearFounded = document.createElement("p");
        let population = document.createElement("p");
        let rainFall = document.createElement("p");
        let details = document.createElement("div");

        h2.textContent = town[i].name;
        h3.textContent = town[i].motto;
        yearFounded.textContent = "Year Founded: " + town[i].yearFounded;
        population.textContent = "Population: " + town[i].currentPopulation;
        rainFall.textContent = "Annual Rainfall: " + town[i].averageRainfall;

        image.setAttribute("src", "images/" + town[i].photo);
        image.setAttribute("alt", town[i].name);
        details.setAttribute("id", "details");

        card.appendChild(h2);
        card.appendChild(h3);
        card.appendChild(details);
        card.appendChild(yearFounded);
        card.appendChild(population);
        card.appendChild(rainFall);
        card.appendChild(image);

        document.querySelector("div.cards").appendChild(card);
      }
    }
  });
