const axios = require("axios").default;

function addWord() {
  const word = document.getElementById("word").value;
  const dmg = document.getElementById("dmg").value;
  const eir = document.getElementById("eir").value;
  const ijmes = document.getElementById("ijmes").value;
  const loc = document.getElementById("loc").value;

  axios
    .post("http://localhost:3737/words", {
      [word]: { dmg, eir, ijmes, loc },
    })
    .then(() => {
      document.querySelectorAll("input").forEach((element) => {
        element.value = "";
      });
      document.activeElement.blur();
    })
    .catch((error) => {
      if (error.response) {
        // Get HTTP error code
        console.log(error.reponse.status);
      } else {
        console.log(error.message);
      }
    });
}

document.getElementById("btn").addEventListener("click", addWord);

document.querySelectorAll("input").forEach((element) => {
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      document.getElementById("btn").click();
    }
  });
});
