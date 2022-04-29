const axios = require("axios").default;

// Function to post word to server
function addWord() {
  const word = document.getElementById("word").value.trim();
  const dmg = document.getElementById("dmg").value.trim();
  const eir = document.getElementById("eir").value.trim();
  const ijmes = document.getElementById("ijmes").value.trim();
  const loc = document.getElementById("loc").value.trim();

  // All fields must be filled
  if (!word || !dmg || !eir || !ijmes || !loc) return;

  axios
    .post("http://localhost:3737/words", { [word]: { dmg, eir, ijmes, loc } })
    .then(() => {
      // Clear input fields if post succeeded
      document.querySelectorAll("input").forEach((element) => {
        element.value = "";
      });
      document.activeElement.blur();
    })
    .catch((error) => {
      if (error.response) {
        // Get HTTP error code, if available
        console.log(error.response.status);
      } else {
        console.log(error.message);
      }
    });
}

// Event handlers

document.getElementById("btn").addEventListener("click", addWord);

document.querySelectorAll("input").forEach((element) => {
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      document.getElementById("btn").click();
    }
  });
});
