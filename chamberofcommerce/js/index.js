// Date JS

const currentdate = document.querySelector("#date");

let d = new Date();

let formateddate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
}).format(d);

currentdate.textContent = formateddate;

// menu toggle
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
