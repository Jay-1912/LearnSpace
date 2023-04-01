const express = require("express");
const userModel = require("./models");
const courseModel = require("./Models/course");
const app = express();
const Student = require("./models");
const Teacher = require("./modelTeacher");
const Quiz = require("./Models/quiz");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
var nodemailer = require("nodemailer");
const OrgForRegistration = require("./Models/organizationForRegistration");
const JWT_SECRET = "axdfvcjedshntcj14363sddbcj";

var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "learnspace.project@gmail.com",
    pass: "xvopwhgjirydlozz",
  },
});

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
const Admin = require("./Models/admin");
const Notice = require("./Models/notice");

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
    let course = await courseModel.findById({ _id: id });
    let enrolledStudents = course.enrolled_students;
    for (let studentId of enrolledStudents) {
      let student = await Student.findById({ _id: studentId });
      let enrolledCourses = student.enrolled_courses;
      delete enrolledCourses[id];
      await Student.findByIdAndUpdate(
        { _id: studentId },
        { enrolled_courses: enrolledCourses }
      );
    }
    const result = await courseModel.deleteOne({ _id: id });
    res.send(result);
  } catch (error) {
    console.log(error);
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
    for (let section of updatedCourse.sections) {
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
  try {
    data = await Student.find({ _id: req.params.id });
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/create-student", upload.single("profile"), async (req, res) => {
  console.log("here");
  const filename = req.file.filename;
  const student = new Student({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    profile: filename,
    organization: req.body.organization,
  });
  console.log(student);
  try {
    console.log(student);
    await student.save();
    var mailOptions = {
      from: "learnspace.project@gmail.com",
      to: req.body.email,
      subject: "Your Learnspace Account",
      html:
        "<h1>Do not share this mail with anyone</h1><br><p>Email:" +
        req.body.email +
        "</p><p>Password:" +
        req.body.password +
        "</p>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
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
        phone: req.body.phone,
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

app.post("/update-student-progress", upload.single(), async (req, res) => {
  let studentId = req.body.studentId;
  let courseId = req.body.courseId;
  let section = req.body.section;
  let lesson = req.body.lesson;

  let student = await Student.findById({ _id: studentId });
  let enrolledCourses = student.enrolled_courses;
  enrolledCourses[courseId][section][lesson] = 1;

  try {
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
});

app.get("/get-student-progress/:studentId/:courseId", async (req, res) => {
  let studentId = req.params.studentId;
  let courseId = req.params.courseId;
  try {
    let student = await Student.findById({ _id: studentId });
    let course = student.enrolled_courses[courseId];
    let completedLesson = 0;
    let totalLesson = 0;
    for (let section of course) {
      for (let lesson of section) {
        if (lesson == 1) completedLesson++;
        totalLesson++;
      }
    }
    var progress = Math.round((completedLesson / totalLesson) * 100);
    res.send({ progress });
  } catch (error) {
    res.send(error);
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
    console.log(err);
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
    phone: req.body.phone,
    about: req.body.about,
    password: req.body.password,
    profile: filename,
    organization: req.body.organization,
  });
  try {
    await teacher.save();
    var mailOptions = {
      from: "learnspace.project@gmail.com",
      to: req.body.email,
      subject: "Your Learnspace Account",
      html:
        "<h1>Do not share this mail with anyone</h1><br><p>Email:" +
        req.body.email +
        "</p><p>Password:" +
        req.body.password +
        "</p>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
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
        phone: req.body.phone,
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
    phone: req.body.phone,
    image: filename,
  });

  try {
    await organization.save();
    var mailOptions = {
      from: "learnspace.project@gmail.com",
      to: req.body.email,
      subject: "Your Learnspace Account",
      html:
        "<h1>Do not share this mail with anyone</h1><br><p>Email:" +
        req.body.email +
        "</p><p>Password:" +
        req.body.password +
        "</p>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
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
          phone: req.body.phone,
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

app.post(
  "/post_org_for_registration",
  upload.single("file"),
  async (req, res) => {
    console.log(req.body);
    // const filename = req.file.filename;
    // console.log(filename);
    const organization = new OrgForRegistration({
      applicantType: req.body.applicantType,
      name: req.body.name,
      uniqId: req.body.uniqId,
      branchName: req.body.branchName,
      branchAddress: req.body.branchAddress,
      branchCity: req.body.branchCity,
      branchState: req.body.branchState,
      branchTelephone: req.body.branchTelephone,
      branchEmail: req.body.branchEmail,
      branchOwnerName: req.body.branchOwnerName,
      branchOwnerTelephone: req.body.branchOwnerTelephone,
      branchOwnerPan: req.body.branchOwnerPan,
      branchDocument: "harsh",
      branchRegistrationNumber: req.body.branchRegistrationNumber,
      branchRegistrationDate: req.body.branchRegistrationDate,
    });

    try {
      await organization.save();
      var mailOptions = {
        from: "learnspace.project@gmail.com",
        to: req.body.email,
        subject: "Your Learnspace Account",
        html:
          "<h1>Do not share this mail with anyone</h1><br><p>Email:" +
          req.body.email +
          "</p><p>Password:" +
          req.body.password +
          "</p>",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.send(organization);
    } catch (err) {
      res.send(err);
    }
  }
);

// quiz endpoints
//Quiz
app.get("/quizes", async (req, res) => {
  try {
    let quizData = await Quiz.find();
    res.send({ code: 200, quizes: quizData });
  } catch (error) {
    console.log(error);
    res.send({ code: 400 });
  }
});

app.get("/quiz/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let quizData = await Quiz.findById({ _id: id });
    res.send({ code: 200, quiz: quizData });
  } catch (error) {
    console.log(error);
    res.send({ code: 400 });
  }
});

app.post("/add_quiz", upload.single(), async (req, res) => {
  const course = await Course.findById({ _id: req.body.course });
  const quiz = new Quiz({
    title: req.body.title,
    organization: req.body.organization,
    course: req.body.course,
    instructor: course.instructor,
    section: parseInt(req.body.section),
  });

  let section = parseInt(req.body.section);
  let courseID = req.body.course;
  try {
    let savedQuiz = await quiz.save();
    let lesson = {
      title: req.body.title,
      type: "quiz",
      id: savedQuiz._id,
    };
    let course = await courseModel.find({ _id: courseID });
    let tempSections = course[0].sections;
    tempSections[section].lesson.push(lesson);
    const updateResult = await courseModel.findByIdAndUpdate(
      { _id: courseID },
      { sections: tempSections },
      { new: true }
    );
    res.send({ code: 200, message: "Quiz Created Successfully!", quiz: quiz });
  } catch (err) {
    console.log(err);
    res.send({ code: 400, message: "something went wrong!" });
  }
});

app.post("/edit_quiz/:id", upload.single(), async (req, res) => {
  const quizId = req.params.id;
  try {
    const course = await Course.findById({ _id: req.body.course });
    let updatedQuiz = await Quiz.findByIdAndUpdate(
      { _id: quizId },
      {
        title: req.body.title,
        organization: req.body.organization,
        course: req.body.course,
        instructor: course.instructor,
        section: parseInt(req.body.section),
      },
      { new: true }
    );
    res.send({
      code: 200,
      message: "Quiz updated Successfully!",
      quiz: updatedQuiz,
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "something went wrong!" });
  }
});

app.get("/delete_quiz/:id", async (req, res) => {
  try {
    await Quiz.findByIdAndDelete({ _id: req.params.id });
    res.send({ code: 200, message: "Quiz deleted successfully!" });
  } catch (error) {
    res.send({ code: 400, message: "Something went wrong!" });
    console.log(error);
  }
});

app.post(
  "/attend_quiz/:quizId/:studentId",
  upload.single(),
  async (req, res) => {
    const quizId = req.params.quizId;
    const studentId = req.params.studentId;
    const quiz = await Quiz.findById({ _id: quizId });
    let students = {};
    if (quiz.students) {
      students = quiz.students;
    }
    students[studentId] = req.body;
    try {
      await Quiz.findByIdAndUpdate({ _id: quizId }, { students: students });
      res.send({ code: 200, message: "Quiz saved successfully!" });
    } catch (error) {
      console.log(error);
      res.send({ code: 400, message: "Something went wrong!" });
    }
  }
);

app.post("/add_question/:id", upload.single(), async (req, res) => {
  const id = req.params.id;
  let question = {
    question: req.body.question,
    options: JSON.parse(req.body.options),
    correct_option: parseInt(req.body.correct_option),
  };
  const quiz = await Quiz.findById({ _id: id });
  let questions = quiz.questions;
  questions.push(question);
  try {
    let updatedQuiz = await Quiz.findByIdAndUpdate(
      { _id: id },
      { questions: questions },
      { new: true }
    );
    res.send({
      Code: 200,
      message: "Question Created Successfully!",
      quiz: updatedQuiz,
    });
  } catch (error) {
    res.send({ Code: 400, message: "Something went wrong!" });
  }
});

app.post("/edit_question/:id", upload.single(), async (req, res) => {
  const id = req.params.id;
  const questionIndex = parseInt(req.body.index);
  let question = {
    question: req.body.question,
    options: JSON.parse(req.body.options),
    correct_option: parseInt(req.body.correct_option),
  };
  const quiz = await Quiz.findById({ _id: id });
  let questions = quiz.questions;
  questions[questionIndex] = question;
  try {
    let updatedQuiz = await Quiz.findByIdAndUpdate(
      { _id: id },
      { questions: questions },
      { new: true }
    );
    res.send({
      Code: 200,
      message: "Question updated Successfully!",
      quiz: updatedQuiz,
    });
  } catch (error) {
    res.send({ Code: 400, message: "Something went wrong!" });
  }
});

app.get("/delete_question/:id/:index", async (req, res) => {
  const quizId = req.params.id;
  const index = req.params.index;
  const quiz = await Quiz.findById({ _id: quizId });
  let questions = quiz.questions;
  if (index > -1) {
    questions.splice(index, 1);
  }
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      { _id: quizId },
      { questions: questions },
      { new: true }
    );
    res.send({
      code: 200,
      message: "Question deleted Successfully",
      quiz: updatedQuiz,
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "Something went wrong!" });
  }
});

// app.get("/view-quiz/:id", async (req, res) => {
//   const quizId = req.params.id;
//   try {
//     let quiz = await Quiz.findOne({ _id: quizId });
//     res.send(quiz);
//     console.log(quiz);
//   } catch (err) {
//     console.error(err);
//   }
// });

// app.get("/quizes", async (req, res) => {
//   try {
//     let quizes = await Quiz.find({});
//     res.send(quizes);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.get("/quizes/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     let quiz = await Quiz.findOne({ _id: id });
//     res.send(quiz);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.delete("/delete-quiz/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let response = await Quiz.deleteOne({ _id: id });
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Super Admin
app.get("/super-admins", async (req, res) => {
  try {
    const adminData = await Admin.find();
    res.send({ code: 200, admins: adminData });
  } catch (error) {
    res.end({ code: 400, message: "something went wrong!" });
  }
});

app.get("/super-admin/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const adminData = await Admin.findById({ _id: id });
    res.send({ code: 200, admin: adminData });
  } catch (error) {
    res.end({ code: 400, message: "something went wrong!" });
  }
});

app.post("/add_super-admin", upload.single("file"), async (req, res) => {
  let filename = "";
  if (req.file) {
    filename = req.file.filename;
  }

  try {
    const admin = new Admin({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      profile: filename,
    });
    await admin.save();
    var mailOptions = {
      from: "learnspace.project@gmail.com",
      to: req.body.email,
      subject: "Your Learnspace Account",
      html:
        "<h1>Do not share this mail with anyone</h1><br><p>Email:" +
        req.body.email +
        "</p><p>Password:" +
        req.body.password +
        "</p>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ code: 200, message: "Super admin saved successfully!" });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "Something went wrong!" });
  }
});

app.post("/edit_super-admin/:id", upload.single("file"), async (req, res) => {
  let filename = "";
  const id = req.params.id;
  if (req.file) {
    filename = req.file.filename;
  } else {
    filename = req.body.file;
  }
  console.log(req.body);

  try {
    const admin = await Admin.findByIdAndUpdate(
      { _id: id },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        profile: filename,
      }
    );
    res.send({ code: 200, message: "Super admin updated successfully!" });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "Something went wrong!" });
  }
});

app.get("/delete_super-admin/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Admin.findByIdAndDelete({ _id: id });
    res.send({ code: 200, message: "Super admin deleted successfully!" });
  } catch (error) {
    res.send({ code: 400, message: "Something went wrong!" });
  }
});

//Notice
app.get("/notices", async (req, res) => {
  try {
    let noticeData = await Notice.find().sort({ date: -1 });
    res.send({ code: 200, notices: noticeData });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "something went wrong!" });
  }
});

app.get("/notice/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let noticeData = await Notice.findById({ _id: id });
    res.send({ code: 200, notice: noticeData });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "Something went wrong!" });
  }
});

app.post("/add_notice", upload.single(), async (req, res) => {
  try {
    const notice = new Notice({
      title: req.body.title,
      organization: req.body.organization,
    });
    await notice.save();
    res.send({ code: 200, message: "Notice saved successfully" });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "Something went wrong!" });
  }
});

app.post("/edit_notice/:id", upload.single(), async (req, res) => {
  const id = req.params.id;
  try {
    const notice = await Notice.findByIdAndUpdate(
      { _id: id },
      {
        title: req.body.title,
        organization: req.body.organization,
        date: Date.now(),
      }
    );
    res.send({ code: 200, message: "Notice updated successfully" });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "Something went wrong!" });
  }
});

app.get("/delete_notice/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Notice.findByIdAndDelete({ _id: id });
    res.send({ code: 200, message: "Notice deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "Something went wrong!" });
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
    } else if (role == 3) {
      user = await Student.findOne({ email: req.body.email });
    } else {
      user = await Admin.findOne({ email: req.body.email });
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

//Forgot password
app.post("/forgot-password", upload.single(), async (req, res, next) => {
  const email = req.body.email;
  var mailOptions;
  try {
    const student = await Student.find({ email: email });
    const teacher = await Teacher.find({ email: email });
    const organization = await Organization.find({ email: email });
    const admin = await Admin.find({ email: email });
    if (student.length > 0) {
      const secret = JWT_SECRET + student._id;
      const payload = {
        email: student.email,
        id: student._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
      const link = `http://localhost:4200/reset-password/${student._id}/${token}`;
      console.log(student[0].email);
      mailOptions = {
        from: "learnspace.project@gmail.com",
        to: student[0].email,
        subject: "Password Reset - LearnSpace",
        html: "<h1>Reset your password:</h1><br><p>" + link + "</p>",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.send({
        code: 200,
        user: student,
        role: 3,
        token,
        message: "Password reset link has been sent to your email!",
      });
    } else if (teacher.length > 0) {
      const secret = JWT_SECRET + teacher._id;
      const payload = {
        email: teacher.email,
        id: teacher._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
      const link = `http://localhost:4200/reset-password/${teacher._id}/${token}`;
      mailOptions = {
        from: "learnspace.project@gmail.com",
        to: student.email,
        subject: "Password Reset - LearnSpace",
        html: "<h1>Reset your password:</h1><br><p>" + link + "</p>",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.send({
        code: 200,
        user: teacher,
        role: 2,
        token,
        message: "Password reset link has been sent to your email!",
      });
    } else if (organization.length > 0) {
      const secret = JWT_SECRET + organization._id;
      const payload = {
        email: organization.email,
        id: organization._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
      const link = `http://localhost:4200/reset-password/${organization._id}/${token}`;
      mailOptions = {
        from: "learnspace.project@gmail.com",
        to: organization.email,
        subject: "Password Reset - LearnSpace",
        html: "<h1>Reset your password:</h1><br><p>" + link + "</p>",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.send({
        code: 200,
        user: organization,
        role: 1,
        token,
        message: "Password reset link has been sent to your email!",
      });
    } else if (admin.length > 0) {
      const secret = JWT_SECRET + admin._id;
      const payload = {
        email: admin.email,
        id: admin._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
      const link = `http://localhost:4200/reset-password/${admin._id}/${token}`;
      mailOptions = {
        from: "learnspace.project@gmail.com",
        to: admin.email,
        subject: "Password Reset - LearnSpace",
        html: "<h1>Reset your password:</h1><br><p>" + link + "</p>",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.send({
        code: 200,
        user: admin,
        role: 0,
        token,
        message: "Password reset link has been sent to your email!",
      });
    } else {
      res.send({ code: 201, message: "User doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "something went wrong!" });
  }
});

app.post("/verify-token", upload.single(), async (req, res) => {
  const id = req.body.id;
  const role = parseInt(req.body.role);
  const token = req.body.token;
  let userExist = false;
  let user;
  try {
    if (role == 3) {
      user = await Student.find({ _id: id });
      if (user.length > 0) userExist = true;
    } else if (role == 2) {
      user = await Teacher.find({ _id: id });
      if (user.length > 0) userExist = true;
    } else if (role == 1) {
      user = await Organization.find({ _id: id });
      if (user.length > 0) userExist = true;
    } else if (role == 0) {
      user = await Admin.find({ _id: id });
      if (user.length > 0) userExist = true;
    }

    if (userExist == true) {
      const secret = JWT_SECRET + user._id;
      const payload = jwt.verify(token, secret);
      res.send({ code: 200, message: "Token verified successfully!" });
    } else {
      res.send({ code: 400, message: "User doesn't exists!" });
    }
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "something went wrong!" });
  }
});

app.post("/reset-password", async (req, res) => {
  const id = req.body.id;
  const role = parseInt(req.body.role);
  const password = req.body.password;
  try {
    if (role == 3) {
      await Student.findByIdAndUpdate({ _id: id }, { password: password });
    } else if (role == 2) {
      console.log("here");
      await Teacher.findByIdAndUpdate({ _id: id }, { password: password });
    } else if (role == 1) {
      await Organization.findByIdAndUpdate({ _id: id }, { password: password });
    } else if (role == 0) {
      await Admin.findByIdAndUpdate({ _id: id }, { password: password });
    }
    res.send({ code: 200, message: "Password reset successfully!" });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: "Something went wrong!" });
  }
});

module.exports = app;
