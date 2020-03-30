const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/post');


mongoose.connect('mongodb+srv://akash:mongo13422@cluster0-oywy8.mongodb.net/node-angular?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true })
.then(()=> {
  console.log('Connected to database!');
}).catch(()=>{
  console.log('connection failed!')
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use((req,res,next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Orgin, X-Requested-with,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT,OPTIONS");
  next();
});


app.post("/api/posts", (req,res,next)=>{
  const post = new Post({
    title:req.body.title,
    content:req.body.content
  });

  post.save();
  res.status(201).json({
    massage:'Post added successfully'
  });
});

app.get('/api/posts' ,(req,res,next) => {

  Post.find()
  .then(documents => {
    res.status(200).json({
      massage:"Posts fetched successfully!",
      posts:documents
    })
  })
  .catch();
});

app.delete("/api/posts/:id", (req,res,next) => {
  console.log(req.params.id);
  res.status(200).json({massage:"Post deleted!"})
});


module.exports = app;
