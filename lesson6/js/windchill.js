const t = parseInt(document.querySelector("#temp").textContent);
const s = parseInt(document.querySelector("#speed").textContent);
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
