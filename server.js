const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cluster = require("cluster");
const totalCPUs = require("os").availableParallelism();
const compression = require("compression");
const colors = require("colors");

const connectDB = require("./server/database/connection");
require("./server/controller/RecurringTaskPing");

dotenv.config();
// { path: "../config.env" }
const PORT = process.env.PORT || 5000;

connectDB();

if (cluster.isPrimary) {
  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {
    

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(morgan("tiny"));
app.use("/api", require("./server/routes/routes"));

// app.use(express.static("../frontend/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
// });

app.use("/", (req, res) => {
  res.send("Server is running...");
});

app.get("*", function (req, res) {
  res.send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`.bgMagenta.white);
});

}





