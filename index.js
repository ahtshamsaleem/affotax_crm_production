const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");


const compression = require("compression");


const connectDB = require("./server/database/connection");
require("./server/controller/RecurringTaskPing");



dotenv.config();


connectDB();
    

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(morgan("tiny"));
app.use("/api", require("./server/routes/routes"));

app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"));
});

app.use("/", (req, res) => {
  res.send("Server is running...");
});

app.get("*", function (req, res) {
  res.send("404 Not Found");
});

app.listen(5000, () => {
  console.log(`Server Started on http://localhost:${5000}`);
});







