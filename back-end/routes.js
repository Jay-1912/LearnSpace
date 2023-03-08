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
  destination: "./public/images",
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
    instructor: req.body.instructor,
  });
  try {
    await course.save();
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/edit_course/:id", upload.single("thumbnail"), async (req, res) => {
  let filename = "";
  if (req.file != undefined) {
    filename = req.file.filename;
  } else {
    filename = req.body.thumbnail;
  }
  const id = req.params.id;
  try {
    const updateResult = await courseModel.findByIdAndUpdate(
      { _id: id },
      {
        title: req.body.title,
        overview: req.body.overview,
        instructor: req.body.instructor,
        thumbnail: filename,
        sections: JSON.parse(req.body.sections),
      }
    );
    res.send(updateResult);
  } catch (error) {
    res.send(error);
  }
});

app.post("/add_lesson", upload.single("file"), async (req, res) => {
  const filename = req.file.filename;
  const courseID = req.body.courseID;
  if (courseID) {
    let course = await courseModel.find({ _id: courseID });
    let tempSections = course[0].sections;
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
        { sections: tempSections },
        { new: true}
      );
      res.send(updateResult);
    } catch (error) {
      res.send(error);
    }
  }
});

app.post("/edit_lesson", upload.single("file"), async (req, res) =>{
  let filename;
  if(req.file){
    filename = req.file.filename;
  }else{
    filename = req.body.file;
  }
  const courseID = req.body.courseID;
  if(courseID){
    let course = await courseModel.find({_id: courseID});
    let tempSections = course[0].sections;
    let editedSection = req.body.section;
    let editedLesson = req.body.lesson;
    tempSections[editedSection].lesson[editedLesson].title = req.body.title;
    tempSections[editedSection].lesson[editedLesson].type = req.body.type;
    tempSections[editedSection].lesson[editedLesson].file = filename;
    try {
      const updateResult = await courseModel.findByIdAndUpdate(
        { _id: courseID },
        { sections: tempSections },
        { new: true }
      );
      res.send(updateResult);
    } catch (error) {
      res.send(error);
    }
  }
});

app.post("/delete_lesson", upload.single(""), async(req, res)=>{
  const courseID = req.body.courseID;
  if(courseID){
    let course = await courseModel.find({_id: courseID});
    let tempSections = course[0].sections;
    let deletedSection = req.body.section;
    let deletedLesson = req.body.lesson;
    if(deletedLesson>-1){
      tempSections[deletedSection].lesson.splice(deletedLesson, 1);
    }
    try {
      const updateResult = await courseModel.findByIdAndUpdate(
        { _id: courseID },
        { sections: tempSections },
        { new: true }
      );
      res.send(updateResult);
    } catch (error) {
      res.send(error);
    }
  }
})

// manage student routes

app.get("/get-students/:org", async (req, res) => {
  let data;
  data = await Student.find({ organization: req.params.org });
  return res.send(data);
});
app.get("/get-student/:id", async (req, res) => {
  let data;
  data = await Student.find({ _id: req.params.id });
  return res.send(data);
});

app.post("/create-student", upload.single("profile"), async (req, res) => {
  const filename = req.file.filename;
  const student = new Student({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    profile: filename,
    organization: req.body.organization,
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

app.post("/update-student/:id", upload.single("profile"), async (req, res) => {
  let filename = "";
  if (req.file != undefined) {
    filename = req.file.filename;
  } else {
    filename = req.body.profile;
  }
  try {
    let updatedData = await Student.updateOne(
      { _id: req.params.id },
      {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        profile: filename,
        organization: req.body.organization,
      }
    );
    res.send(updatedData);
  } catch (error) {
    res.status(500).send(error);
    console.log(filename);
    console.log("here here  ");
  }
});

// manage teachers route
app.get("/teachers", async (req, res) => {
  const teachers = await Teacher.find();
  try {
    res.send(teachers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/teacher/:id", async (req, res) => {
  const teacher = await Teacher.find({ _id: req.params.id });
  console.log(teacher);
  try {
    res.send(teacher);
  } catch (err) {
    res.status(500).send(err);
  }
});

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
