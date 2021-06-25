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
    console.log(jsObject);

    document.querySelector("#description").innerHTML =
      jsObject.weather[0].description;
    document.querySelector("#temp").innerHTML = jsObject.main.temp;

    // const imagesrc =
    //   "https://openweathermap.org/img/w/" + jsObject.weather[0].icon + ".png"; // note the concatenation
    // const desc = jsObject.weather[0].description; // note how we reference the weather array
    // document.getElementById("imagesrc").textContent = imagesrc; // informational specification only
    // document.getElementById("icon").setAttribute("src", imagesrc); // focus on the setAttribute() method
    // document.getElementById("icon").setAttribute("alt", desc);
  });

// Web font load

WebFont.load({
  google: {
    families: ["Noto Serif", "Noto Sans", "Montserrat"],
  },
});
