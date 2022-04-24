const cors = require("cors");
const express = require("express");
const fs = require("fs");

const app = express();
const port = 3737;

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

      for (const key in postObj) {
        fileObj[key] = postObj[key];
      }

      const returnJson = JSON.stringify(fileObj);

      fs.writeFile("words.json", returnJson, (err) => {
        if (err) throw err;

        res.send(returnJson);
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
