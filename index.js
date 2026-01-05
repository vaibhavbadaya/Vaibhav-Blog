const express =require("express")
const app = express();
const PORT = 8000;
const path = require("path");
const userRouter = require("./routers/user");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/user", userRouter);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});