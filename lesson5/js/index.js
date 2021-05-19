const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector("ul");

button.addEventListener("click", function () {
  let myChapter = input.value;

  const listChapter = document.createElement("li");
  const listText = document.createElement("span");
  const deleteBtn = document.createElement("button");

  if (input.value.length != 0) {
    listChapter.appendChild(listText);
    listText.textContent = myChapter;

    listChapter.appendChild(deleteBtn);
    deleteBtn.textContent = "X";

    list.appendChild(listChapter);

    deleteBtn.addEventListener("click", () => {
      list.removeChild(listChapter);
    });

    input.value = "";
    input.focus();
  }
});
