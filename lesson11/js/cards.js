// JSON

const requestURL = "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject); // temporary checking for valid response and data parsing

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

        card.appendChild(details);
        details.appendChild(h2);
        details.appendChild(h3);
        details.appendChild(yearFounded);
        details.appendChild(population);
        details.appendChild(rainFall);
        card.appendChild(image);

        document.querySelector("div.cards").appendChild(card);
      }
    }
  });
