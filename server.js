const cors = require("cors");
const express = require("express");
const fs = require("fs");

const app = express();
const port = 3737;

// Enable all CORS requests (yikes!)
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post("/words", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    fs.readFile("words.json", (err, data) => {
      if (err) throw err;

      console.log(body);

      const fileObj = JSON.parse(data.toString());
      const postObj = JSON.parse(body);

      // For each key in the posted object, create or update that key in the
      // "file object"
      for (const key in postObj) {
        fileObj[key] = postObj[key];
      }

      // Sort object by key
      // It's better to pay the cost of doing this now
      const fileObjSorted = Object.fromEntries(
        Object.entries(fileObj).sort(([key1], [key2]) =>
          key1.localeCompare(key2)
        )
      );

      const returnJson = JSON.stringify(fileObjSorted);

      // Write the updated object back to the file
      fs.writeFile("words.json", returnJson, (err) => {
        if (err) throw err;

        // Does this send the "return JSON" to the client?
        // Does it go to the console? Should check
        res.send(returnJson);
      });
    });
  });
});

// Listen on the above-specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
