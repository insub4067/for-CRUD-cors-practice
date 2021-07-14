const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");
const cors = require("cors");

const app = express();
const router = express.Router();


mongoose.connect("mongodb://localhost:27017/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: "test",
  pass: "test",
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(
  cors({
    origin: "*",
  })
);

//create
router.post("/post/create", async(req, res) => {
    
  const { title, content } = req.body;
  const post = new Post({ title, content });

  await post.save();
  res.status(200).send({});

});

//read
router.get("/posts", async(req, res) => {

  const result = await Post.find()

  res.json({ result });

});

//readDetail
router.get("/post/detail/:id", async(req, res) => {

  const { id } = req.params;
  const result = await Post.findById(id)

  res.status(200).send({ result });

})

//update
router.put("/post/update/:id", async(req, res) => {

  const { id } = req.params;
  const { title, content } = req.body;

  await Post.findByIdAndUpdate(id, { title, content })
  res.status(200).send({})

});

//delete
router.delete("/post/delete/:id", async(req, res) => {

  const { id } = req.params;

  await Post.findByIdAndDelete(id)
  res.status(200).send({});

});


app.use("/api", express.urlencoded({ extended: false }), router);
app.use(express.json());

app.listen(8080, () => {
    console.log("서버가 요청을 받을 준비가 됐어요");
  });