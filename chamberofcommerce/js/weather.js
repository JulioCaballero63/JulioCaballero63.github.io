const apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=43.70&lon=-116.62&exclude=minutely,hourly&appid=bb328ca5ed25ab2e54b32f4fee76885b&units=imperial`;
fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    document.querySelector("#currently").innerHTML =
      jsObject.current.weather[0].description;
    document.querySelector("#temp").innerHTML = Math.round(
      jsObject.current.temp
    );
    document.querySelector("#humidity").innerHTML = jsObject.current.humidity;
    // alerts
    if (jsObject.alerts.length >= 1) {
      document.querySelector(".banner").style.display = "flex";

      for (i = 0; i < jsObject.alerts.length; i++) {
        document.querySelector("#banner").innerHTML = jsObject.alerts[i].event;
      }
    }
    const close = document.querySelector(".close");
    close.addEventListener("click", () => {
      document.querySelector(".banner").style.display = "none";
    });

    // forecast
    const dayone = Math.round(jsObject.daily[0].temp.day);
    document.querySelector("#forecast1").innerHTML = dayone;

    let iconone = `https://openweathermap.org/img/w/${jsObject.daily[0].weather[0].icon}.png`;
    document.querySelector("#image1").setAttribute("src", iconone);
    document.querySelector("#image1").setAttribute("alt", "iconone");

    const daytwo = Math.round(jsObject.daily[1].temp.day);
    document.querySelector("#forecast2").innerHTML = daytwo;

    let icontwo = `https://openweathermap.org/img/w/${jsObject.daily[1].weather[0].icon}.png`;
    document.querySelector("#image2").setAttribute("src", icontwo);
    document.querySelector("#image2").setAttribute("alt", "icontwo");

    const daythree = Math.round(jsObject.daily[2].temp.day);
    document.querySelector("#forecast3").innerHTML = daythree;

    let iconthree = `https://openweathermap.org/img/w/${jsObject.daily[2].weather[0].icon}.png`;
    document.querySelector("#image3").setAttribute("src", iconthree);
    document.querySelector("#image3").setAttribute("alt", "iconthree");
  });
