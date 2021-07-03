function city(name) {
  let id = "";
  if (name === "Preston Idaho") {
    id = "5604473";
  } else if (name === "Soda Springs") {
    id = "5607916";
  } else if (name === "Fish Haven") {
    id = "5585010";
  }
  console.log(id);

  // Weather Summary
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=bb328ca5ed25ab2e54b32f4fee76885b&units=imperial`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
      document.querySelector("#description").innerHTML =
        jsObject.weather[0].description;
      document.querySelector("#temp").innerHTML = Math.round(
        jsObject.main.temp
      );
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
  const fapiURL = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=bb328ca5ed25ab2e54b32f4fee76885b&units=imperial`;

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
        document
          .querySelector(`#image${day + 1}`)
          .setAttribute("src", imagesrc);
        document.querySelector(`#image${day + 1}`).setAttribute("alt", desc);

        day++;
      });
    });

  // Events
  const townsURL = "https://byui-cit230.github.io/weather/data/towndata.json";

  fetch(townsURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      console.table(jsonObject); // temporary checking for valid response and data parsing

      const towns = jsonObject["towns"];
      for (let i = 0; i < towns.length; i++) {
        if (towns[i].name === "Preston") {
          let events = towns[i].events;
          for (let j = 0; j < events.length; j++) {
            let event = document.createElement("p");
            event.innerHTML = events[j];
            document.querySelector(".eventsgrid").appendChild(event);
          }
        }
      }
    });
}
const townname = document.querySelector("#town-name").textContent;
city(townname);
