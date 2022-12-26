require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const db = require("./config/connection");

// import routes files
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin")

app.use(cors());
app.use(express.json());

//conecting to database
db.connect((err) => {
  if (err) {
    console.log("Database Connection Error:" + err);
  } else {
    console.log("Database Connected Successfully");
  }
});

//use the imported routes
app.use("/", userRouter);
app.use('/admin',adminRouter)

app.get("*", (req, res) => {
  res.send("404");
});

app.listen(PORT, () => console.log(`Port running at ${PORT}`));
