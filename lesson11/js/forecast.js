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
