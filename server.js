const expres = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = expres();
const userroute = require("./routes/user");
dotenv.config();
app.use(expres.json());
app.use(cors());
const port = process.env.PORT || 3000;
app.use("/user", userroute);
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
mongoose.connect(
  "mongodb+srv://Abdullah:VAMPire12345@cluster0.db2xx.mongodb.net/PROJECT0?retryWrites=true&w=majority",
  () => {
    console.log("db connected");
  }
);
app.get("/", (req, res) => {
  res.send("nothing here");
});
