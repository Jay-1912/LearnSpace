const express = require("express");
const userModel = require("./models");
const courseModel = require("./Models/course");
const app = express();

app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await userModel.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });   


const multer = require('multer');


var storage = multer.diskStorage({
  destination: './images',
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage })

app.get("/courses", async (req, res) => {
  const courses = await courseModel.find();
  try{
    res.send(courses);
  }catch(err){
    res.status(500).send(err);
  }
})

app.get("/course/:id", async(req, res) =>{
  const course = await courseModel.find({_id: req.params.id});
  try{
    res.send(course);
  }catch(err){
    res.status(500).send(err);
  }
})

app.post("/add_course", upload.single('thumbnail'), async(req, res) => {
  console.log(req.file);
  const filename = req.file.filename;
  const course = new courseModel({
    "title":req.body.title,
    "overview": req.body.overview,
    "thumbnail": filename,
    "sections": JSON.parse(req.body.sections)
  });
  try {
    await course.save();
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
})

  module.exports = app;