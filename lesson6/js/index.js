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

//-------- Days since last visit ---------

localStorage.getItem("start");
const end = [d.getDay(), d.getMonth() + 1, d.getFullYear()].join("/");

function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}

document.querySelector("#days-since-last-visit").innerHTML =
  " " + getNumberOfDays(localStorage.getItem("start"), end);

const current = [d.getDay(), d.getMonth() + 1, d.getFullYear()].join("/");
localStorage.setItem("start", "current");
