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
