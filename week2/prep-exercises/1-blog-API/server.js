const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const isInvalid = (req) => {
  return typeof req.body.content == "undefined";
};
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/blogs", (req, res) => {
  if (isInvalid(req) || typeof req.body.title == "undefined") {
    res.status(400).send(`Bad request`);
  } else {
    const { title, content } = req.body;
    try {
      fs.writeFileSync(title, content);
      res
        .status(201)
        .send(`${title} is created successfully, contains : ${content}`);
    } catch (error) {
      res.status(500).send(`Something went wrong creating ${title}`);
    }
  }
});

//In this example, title should be entered, otherwise this function will not be executed. Since it uses the title as a path
app.put("/posts/:title", (req, res) => {
  if (isInvalid(req)) {
    res.status(400).send(`Bad request!`);
  } else {
    const content = req.body.content;
    const title = req.params.title;
    if (fs.existsSync(title)) {
      try {
        fs.writeFileSync(title, content);
        res.status(200).send(`${title} is updated successfully`);
      } catch (err) {
        res.status(500).send(`Something went wrong updating ${title}`);
      }
    } else {
      res.status(404).send(`${title} does not exist!`);
    }
  }
});
app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    try {
      fs.unlinkSync(title);
      res.status(200).send(`${title} is deleted successfully`);
    } catch (error) {
      res.status(500).send(`Something went wrong with deleting ${title}`);
    }
  } else {
    res.status(404).send(`${title} does not exist!`);
  }
});
app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    try {
      const post = fs.readFileSync(title);
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send(`Something went wrong with reading ${title}`);
    }
  } else {
    res.status(404).send(`${title} does not exist!`);
  }
});
app.get("/blogs", (req, res) => {
  try {
    const list = fs.readdirSync(__dirname);
    let sendList = [];

    list.forEach((file) => {
      if (!path.extname(file).includes(".") && fs.statSync(file).isFile()) {
        const fileObj = { title: `${file}` };
        sendList.push(fileObj);
      }
    });

    res.status(200).send(sendList);
  } catch (err) {
    res.status(500).send(`Something went wrong with reading posts`);
  }
});
app.listen(3000);
