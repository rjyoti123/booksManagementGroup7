const express = require("express");
const mongoose = require("mongoose");
const route = require('./Routes/route')
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const url="mongodb+srv://mr_rupam:uttam@cluster0.eaxynkv.mongodb.net/group7Database?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(port, (req, res) => {
  console.log(`Express is Running on ${port}`);
});
