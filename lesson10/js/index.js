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

// Weather Summary
const apiURL =
  "http://api.openweathermap.org/data/2.5/weather?id=5604473&appid=bb328ca5ed25ab2e54b32f4fee76885b&units=imperial";

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
  "http://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=bb328ca5ed25ab2e54b32f4fee76885b&units=imperial";

fetch(fapiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);

    let day = 0;
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const forecast = jsObject.list.filter((forecast) =>
      forecast.dt_txt.includes("12:00:00")
    );

    forecast.forEach((i) => {
      let d = new Date(i.dt_txt);
      document.getElementById(`dayofweek${day + 1}`).textContent =
        dayOfWeek[d.getDay()];
      document.getElementById(`forecast${day + 1}`).textContent = Math.round(
        i.main.temp_max
      );
      day++;
    });
    // const imagesrc =
    //   "https://openweathermap.org/img/w/" + jsObject.weather[0].icon + ".png";
    // document.getElementById("imagesrc").textContent = imagesrc; // informational specification only
    // document.getElementById("icon").setAttribute("src", imagesrc); // focus on the setAttribute() method
    // document.getElementById("icon").setAttribute("alt", desc);
    // });
  });

// Web font load
WebFont.load({
  google: {
    families: ["Noto Serif", "Noto Sans", "Montserrat"],
  },
});
