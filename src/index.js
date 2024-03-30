const cors = require("cors");
const express = require("express");
const connectToDB = require("../config/database.js");
const userRoutes = require("../routes/user.js");
const adminRoutes = require("../routes/admin.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

adminRoutes(app);
userRoutes(app);

connectToDB();

app.get("/", (req, res) => {
  console.log("hello world");
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`The port started at ${port}`);
});
