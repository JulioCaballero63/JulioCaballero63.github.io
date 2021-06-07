let d = new Date();
document.querySelector("#date").textContent = [
  d.getMonth() + 1,
  d.getDay(),
  d.getFullYear(),
].join(".");
