const fs = require("fs");

fs.readFile("words.json", (err, data) => {
  if (err) throw err;

  const fullObj = JSON.parse(data.toString());

  const returnJson = JSON.stringify(fullObj);

  // Write minified object back to file
  fs.writeFile("words.json", returnJson, (err) => {
    if (err) throw err;
  });
});
