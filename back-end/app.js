const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");
const http = require("http");
const app = express();
const {socketConnection} = require("./utils");


const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use("/images", express.static("images"));

// "mongodb+srv://jayvadhavana23:SaiKWADtyfKL7p0j@cluster0.ffgkkwd.mongodb.net/?retryWrites=true&w=majority",
mongoose
  .connect(
    "mongodb+srv://jayvadhavana23:SaiKWADtyfKL7p0j@cluster0.ffgkkwd.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// app.get("/trial", (req, res) => {
//   res.json({
//     statusCode: 200,
//     statusMessage: "SUCCESS",
//     data: "trial",
//   });
// });

app.use(Router);

const server = http.createServer(app);
// const {Server} = require("socket.io");
// const io = new Server(server,{
//   cors: corsOptions
// }); 

// io.on("connection", (socket)=>{
//   console.log("socket connected", socket.id);
// })
socketConnection(server);

server.listen(3000, (req, res) => {
  console.log("Express API is running at port 3000");
});
