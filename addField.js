const fs = require("fs");

fs.readFile("playspace.json", (err, data) => {
  if (err) throw err;

  const fullObj = JSON.parse(data.toString());

  // Add IS property to each word object
  for (const key in fullObj) {
    const wordObj = fullObj[key];

    // Setting it equal to IJMES is a good starting point
    wordObj.is = wordObj.ijmes;

    // Sort word object
    const wordObjSorted = Object.fromEntries(Object.entries(wordObj).sort());

    fullObj[key] = wordObjSorted;
  }

  // Sort overall object
  const fullObjSorted = Object.fromEntries(
    Object.entries(fullObj).sort(([key1], [key2]) => key1.localeCompare(key2)),
  );

  const returnJson = JSON.stringify(fullObjSorted);

  // Write the updated object back to the file
  fs.writeFile("playspace.json", returnJson, (err) => {
    if (err) throw err;
  });
});
