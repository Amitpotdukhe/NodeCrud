//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

mongoose.connect(process.env.URL);

const postSchema = {
  title: String,
  body: String
};

const Post = mongoose.model("Post", postSchema);

app.route("/posts")

.get(function(req, res){
  Post.find(function(err, posts){
    if (!err) {
      res.send(posts);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){

  const newPost = new Post({
    title: req.body.title,
    body: req.body.body
  });

  newPost.save(function(err){
    if (!err){
      res.send("Successfully added a new postss.");
    } else {
      res.send(err);
    }
  });
})

app.route("/posts/:post")
.get(function(req, res){

  Post.findOne({title: req.params.post}, function(err, post){
    if (post) {
      res.send(post);
    } else {
      res.send("No posts matching that title.");
    }
  });
})

.delete(function(req, res){

  Post.deleteOne(
    {title: req.params.post},
    function(err){
      if (!err){
        res.send("Successfully deleted .");
      } else {
        res.send(err);
      }
    }
  );
});

app.listen(port, function() {
  console.log("Server started on port 3000");
});
