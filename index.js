const express =require("express")
const app = express();
const PORT = 8000;
const path = require("path");
const userRouter = require("./routers/user");
const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/BlogTech').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user", userRouter);


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    res.render("home");
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});