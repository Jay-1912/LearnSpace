const express = require("express");
const userModel = require("./models");
const courseModel = require("./Models/course");
const app = express();
const Student = require("./models");
const Teacher = require("./modelTeacher");

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

const multer = require("multer");

var storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/courses", async (req, res) => {
  const courses = await courseModel.find();
  try {
    res.send(courses);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/course/:id", async (req, res) => {
  const course = await courseModel.find({ _id: req.params.id });
  try {
    res.send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/add_course", upload.single("thumbnail"), async (req, res) => {
  const filename = req.file.filename;
  const course = new courseModel({
    title: req.body.title,
    overview: req.body.overview,
    thumbnail: filename,
    sections: JSON.parse(req.body.sections),
  });
  try {
    await course.save();
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/add_lesson", upload.single("file"), async (req, res) => {
  const filename = req.file.filename;
  const courseID = req.body.courseID;
  if (courseID) {
    let course = await courseModel.find({ _id: courseID });
    let tempSections = course[0].sections;
    function findSection(section) {
      return section.title == req.body.section;
    }
    let lesson = {
      title: req.body.title,
      type: req.body.type,
      file: filename,
    };
    for (let section of tempSections) {
      if (section.title == req.body.section) {
        section.lesson.push(lesson);
      }
    }
    try {
      const updateResult = await courseModel.findByIdAndUpdate(
        { _id: courseID },
        { sections: tempSections }
      );
      res.send(updateResult);
    } catch (error) {
      res.send(error);
    }
  }
});

// manage student routes
app.post("/create-student", async (req, res) => {
  const student = new Student({
    id: req.body.id,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(student);
  try {
    await student.save();
    res.send(student);
    console.log("student saved");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/delete-student", async (req, res) => {
  const stuId = req.body.stuId;
  console.log(req.body.stuId);
  try {
    await Student.deleteOne({ id: stuId });
    res.send(stuId + " deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

// manage teachers routes
app.post("/create-teacher", async (req, res) => {
  const teacher = new Teacher({
    id: req.body.id,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(teacher);
  try {
    await teacher.save();
    res.send(teacher);
    console.log("teacher saved");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
