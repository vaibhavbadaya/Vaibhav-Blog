const express =require("express")
const app = express();
const PORT = 8000;
const path = require("path");
const userRouter = require("./routers/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {checkAuth} = require("./middlewares/auth");

mongoose.connect('mongodb://localhost:27017/BlogTech').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user", userRouter);
app.use(checkAuth("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    res.render("home", {user: req.user});
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});