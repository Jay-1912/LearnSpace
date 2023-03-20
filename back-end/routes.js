const express = require("express");
const userModel = require("./models");
const courseModel = require("./Models/course");
const app = express();
const Student = require("./models");
const Teacher = require("./modelTeacher");
const Quiz = require("./Models/quiz");

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
const Organization = require("./Models/organization");
const Course = require("./Models/course");

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

app.get("/courses/:org", async (req, res) => {
  const courses = await courseModel.find({ organization: req.params.org });
  try {
    res.send(courses);
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
    organization: req.body.organization,
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

app.get("/delete_course/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await courseModel.deleteOne({ _id: id });
    res.send(result);
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
        { new: true }
      );
      res.send(updateResult);
    } catch (error) {
      res.send(error);
    }
  }
});

app.post("/edit_lesson", upload.single("file"), async (req, res) => {
  let filename;
  if (req.file) {
    filename = req.file.filename;
  } else {
    filename = req.body.file;
  }
  const courseID = req.body.courseID;
  if (courseID) {
    let course = await courseModel.find({ _id: courseID });
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

app.post("/delete_lesson", upload.single(""), async (req, res) => {
  const courseID = req.body.courseID;
  if (courseID) {
    let course = await courseModel.find({ _id: courseID });
    let tempSections = course[0].sections;
    let deletedSection = req.body.section;
    let deletedLesson = req.body.lesson;
    if (deletedLesson > -1) {
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
});

app.post("/enroll-to-course/:id", upload.single(""), async (req, res) => {
  const courseID = req.params.id;
  const studentID = req.body.studentID;
  const course = await courseModel.findById({ _id: courseID });
  const student = await Student.findById({ _id: studentID });
  console.log(course);
  try {
    let enrolledStudents;
    if (course.enrolled_students) {
      enrolledStudents = course.enrolled_students;
    } else {
      enrolledStudents = [];
    }
    enrolledStudents.push(studentID);
    let updatedCourse = await courseModel.findByIdAndUpdate(
      { _id: courseID },
      { enrolled_students: enrolledStudents },
      { new: true }
    );

    let enrolledCourses;
    if (student.enrolled_courses) {
      enrolledCourses = student.enrolled_courses;
    } else {
      enrolledCourses = {};
    }
    let courseMat = [];
    for(let section of updatedCourse.sections){
      courseMat.push(new Array(section.lesson.length));
    }
    enrolledCourses[courseID] = courseMat;
    let updatedStudent = await Student.findByIdAndUpdate(
      { _id: studentID },
      { enrolled_courses: enrolledCourses },
      { new: true }
    );
    res.send({ status: 200, message: "enrolled successfully!" });
  } catch (error) {
    console.log(error);
    res.send({ status: 400, message: "something went wrong!" });
  }
});

// manage student routes
app.get("/get-students", async (req, res) => {
  let data;
  data = await Student.find();
  return res.send(data);
});

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
  console.log("here");
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
    console.log(student);
    await student.save();
    res.send(student);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.delete("/delete-student/:id", async (req, res) => {
  const stuId = req.params.id;
  try {
    let deleteStudentResponse = await Student.deleteOne({ _id: stuId });
    res.send(deleteStudentResponse);
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


app.post("/update-student-progress",upload.single(), async(req, res)=>{
  let studentId = req.body.studentId;
  let courseId = req.body.courseId;
  let section = req.body.section;
  let lesson = req.body.lesson;

  let student = await Student.findById({_id:studentId});
  let enrolledCourses = student.enrolled_courses;
  enrolledCourses[courseId][section][lesson] = 1;

  try{
    let updatedStudent = await Student.findByIdAndUpdate(
      { _id: studentId },
      { enrolled_courses: enrolledCourses },
      { new: true }
    );
    res.send({ status: 200, message: "progress updated successfully!" });
  } catch (error) {
    console.log(error);
    res.send({ status: 400, message: "something went wrong!" });
  }
})

app.get("/get-student-progress/:studentId/:courseId", async(req, res)=>{
  let studentId = req.params.studentId;
  let courseId = req.params.courseId;
  try{
    let student = await Student.findById({_id:studentId});
    let course = student.enrolled_courses[courseId];
    let completedLesson = 0;
    let totalLesson = 0;
    for(let section of course){
      for(let lesson of section){
        if(lesson==1) completedLesson++;
        totalLesson++;
      }
    }
    var progress = (completedLesson/totalLesson)*100;
    res.send({progress});
  }
  catch(error){
    res.send(error);
  }
  
})

// manage teachers route
app.get("/teachers", async (req, res) => {
  const teachers = await Teacher.find();
  try {
    res.send(teachers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/get-teachers/:org", async (req, res) => {
  const teachers = await Teacher.find({ organization: req.params.org });
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

app.delete("/delete-teacher/:id", async (req, res) => {
  const teacherId = req.params.id;
  try {
    let deleteTeacherResponse = await Teacher.deleteOne({ _id: teacherId });
    res.send(deleteTeacherResponse);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/create-teacher", upload.single("profile"), async (req, res) => {
  const filename = req.file.filename;
  const teacher = new Teacher({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    about: req.body.about,
    password: req.body.password,
    profile: filename,
    organization: req.body.organization,
  });
  try {
    await teacher.save();
    res.send(teacher);
    console.log("teacher saved");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/update-teacher/:id", upload.single("profile"), async (req, res) => {
  let filename = "";
  if (req.file != undefined) {
    filename = req.file.filename;
  } else {
    filename = req.body.profile;
  }
  console.log(req.body);
  try {
    let updatedData = await Teacher.updateOne(
      { _id: req.params.id },
      {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        about: req.body.about,
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

//Organization
app.get("/organizations", async (req, res) => {
  const organization = await Organization.find();
  try {
    res.send(organization);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/organization/:id", async (req, res) => {
  let id = req.params.id;
  if (id) {
    const organization = await Organization.find({ _id: id });
    try {
      res.send(organization);
    } catch (err) {
      res.send(err);
    }
  }
});

app.post("/add_organization", upload.single("file"), async (req, res) => {
  const filename = req.file.filename;
  const organization = new Organization({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: filename,
  });

  try {
    await organization.save();
    res.send(organization);
  } catch (err) {
    res.send(err);
  }
});

app.post("/edit_organization/:id", upload.single("file"), async (req, res) => {
  let filename;
  if (req.file) {
    filename = req.file.filename;
  } else {
    filename = req.body.file;
  }

  const id = req.params.id;
  if (id) {
    try {
      let updatedRes = await Organization.findByIdAndUpdate(
        { _id: id },
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          image: filename,
        },
        { new: true }
      );

      res.send(updatedRes);
    } catch (err) {
      res.send(err);
    }
  }
});

app.get("/delete_organization/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      let deletedRes = await Organization.deleteOne({ _id: id });
      res.send(deletedRes);
    } catch (err) {
      res.send(err);
    }
  }
});

// quiz endpoints
app.post("/save-quiz", async (req, res) => {
  const quizData = new Quiz({
    quizName: req.body.quizName,
    quizOrganization: req.body.quizOrganization,
    quizOrganizationCourse: req.body.quizOrganizationCourse,
    questions: req.body.questions,
  });

  console.log(quizData);
  try {
    let saveQuizResp = await quizData.save();
    res.send({ resp: saveQuizResp });
    console.log(saveQuizResp);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

app.get("/view-quiz/:id", async (req, res) => {
  const quizId = req.params.id;
  try {
    let quiz = await Quiz.findOne({ _id: quizId });
    res.send(quiz);
    console.log(quiz);
  } catch (err) {
    console.error(err);
  }
});

app.get("/quizes", async (req, res) => {
  try {
    let quizes = await Quiz.find({});
    res.send(quizes);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/quizes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let quiz = await Quiz.findOne({ _id: id });
    res.send(quiz);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/delete-quiz/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let response = await Quiz.deleteOne({ _id: id });
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Authentication
app.post("/login", upload.single(), async (req, res) => {
  console.log(req.body);
  const role = req.body.role;
  let user;
  try {
    if (role == 1) {
      user = await Organization.findOne({ email: req.body.email });
    } else if (role == 2) {
      user = await Teacher.findOne({ email: req.body.email });
    } else {
      user = await Student.findOne({ email: req.body.email });
    }

    if (user) {
      const result = req.body.password === user.password;
      if (result) {
        res.send({ status: 200, success: "User LoggedIn Successfully!", user });
      } else {
        res.send({ status: 400, error: "password doesn't match" });
      }
    } else {
      res.send({ status: 400, error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = app;
