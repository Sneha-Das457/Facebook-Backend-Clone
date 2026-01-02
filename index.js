const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db.js");
const userRoute = require("./src/routers/user.route.js");
const videoRoute = require("./src/routers/video.route.js");
const follwerRoute = require("./src/routers/follwer.route.js");
const likeRoute = require("./src/routers/like.route.js");
const commentRoute = require("./src/routers/comment.route.js");
const apiResponse = require("./src/utils/apiResponse.js");

const port = process.env.PORT || 9000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.set("json spaces", 2);
app.use("/users", userRoute);
app.use("/videos", videoRoute);
app.use("/follwers", follwerRoute);
app.use("/likes", likeRoute);
app.use("/comments", commentRoute);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error.message);
  });

app.get("/", (req, res) => {
  res.send("Welcome to FaceBook backend clone API");
});
