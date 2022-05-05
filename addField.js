const fs = require("fs");

fs.readFile("playspace.json", (err, data) => {
  if (err) throw err;

  const fullObj = JSON.parse(data.toString());

  // Add IJMES-D field to each word object
  for (const key in fullObj) {
    const wordObj = fullObj[key];

    wordObj.ijmesd = "TODO";

    // Sort word object
    const wordObjSorted = Object.fromEntries(Object.entries(wordObj).sort());

    fullObj[key] = wordObjSorted;
  }

  // Sort overall object
  const fileObjSorted = Object.fromEntries(
    Object.entries(fullObj).sort(([key1], [key2]) => key1.localeCompare(key2))
  );

  const returnJson = JSON.stringify(fileObjSorted);

  // Write the updated object back to the file
  fs.writeFile("playspace.json", returnJson, (err) => {
    if (err) throw err;
  });
});
