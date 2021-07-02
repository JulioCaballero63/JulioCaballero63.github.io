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

// Weather Summary
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=bb328ca5ed25ab2e54b32f4fee76885b&units=imperial";

fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    document.querySelector("#description").innerHTML =
      jsObject.weather[0].description;
    document.querySelector("#temp").innerHTML = Math.round(jsObject.main.temp);
    document.querySelector("#humidity").innerHTML = jsObject.main.humidity;
    document.querySelector("#speed").innerHTML = Math.round(
      jsObject.wind.speed
    );

    // Windchill
    const t = parseInt(jsObject.main.temp);
    const s = parseInt(jsObject.wind.speed);
    const feelsLike = `${Math.floor(windChill(t, s))} &deg;F`;

    if (t <= 50 && s > 3) {
      document.querySelector("#feels").innerHTML = feelsLike;
    }

    function windChill(temp, speed) {
      let f =
        35.74 +
        0.6215 * temp -
        35.75 * Math.pow(speed, 0.16) +
        0.4275 * temp * Math.pow(speed, 0.16);
      return f;
    }
  });

// Forecast
const fapiURL =
  "https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=bb328ca5ed25ab2e54b32f4fee76885b&units=imperial";

fetch(fapiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    let day = 0;
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const forecast = jsObject.list.filter((forecastObj) =>
      forecastObj.dt_txt.includes("18:00:00")
    );

    forecast.forEach((i) => {
      let d = new Date(i.dt_txt);
      let imagesrc = `https://openweathermap.org/img/w/${i.weather[0].icon}.png`;
      let desc = i.weather[0].description;
      document.querySelector(`#dayofweek${day + 1}`).textContent =
        weekdays[d.getDay()];
      document.querySelector(`#forecast${day + 1}`).innerHTML = `${Math.round(
        i.main.temp_max
      )} &deg;F`;
      document.querySelector(`#image${day + 1}`).setAttribute("src", imagesrc);
      document.querySelector(`#image${day + 1}`).setAttribute("alt", desc);

      day++;
    });
  });

// Web font load
// WebFont.load({
//   google: {
//     families: ["Noto Serif", "Noto Sans", "Montserrat"],
//   },
// });

// Range
function adjustRating(rating) {
  document.getElementById("ratingvalue").innerHTML = rating;
}

// Lazy load
const imagesToLoad = document.querySelectorAll("img[data-src]");

const imageThreshold = {
  threshold: 0.5,
  rootMargin: "0px 0px 40px 0px",
};

const changeImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
  };
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        changeImages(item.target);
        observer.unobserve(item.target);
      }
    });
  }, imageThreshold);

  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    changeImages(img);
  });
}
