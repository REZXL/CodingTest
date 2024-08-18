const express = require("express");
const cors = require("cors");
require('./connection');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const BlogModel = require('./model');


app.post("/post", async (req, res) => {
  try {
    const newBlog = new BlogModel(req.body);
    await newBlog.save();
    res.status(201).send("Blog added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding blog");
  }
});


app.get("/get", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching blogs");
  }
});


app.put("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedBlog) {
      res.send("Blog updated successfully");
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});


app.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    if (deletedBlog) {
      res.send("Blog deleted successfully");
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error ");
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
