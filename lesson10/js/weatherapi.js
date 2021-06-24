const apiURL =
  "http://api.openweathermap.org/data/2.5/weather?id=5604473&appid=bb328ca5ed25ab2e54b32f4fee76885b";

fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
  });
