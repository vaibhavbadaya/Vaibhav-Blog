require("dotenv").config();
const express =require("express")
const app = express();
const path = require("path");
const userRouter = require("./routers/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {checkAuth} = require("./middlewares/auth");
const Blog = require("./models/blog");
const PORT = process.env.PORT || 8000;

const blogRoute = require("./routers/blog");

mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user", userRouter);
app.use(checkAuth("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.get("/", (req, res) => {
    res.render("home", {user: req.user});
});

app.use("/blog", blogRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});