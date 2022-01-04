const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");

dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("61d3de67fa03a55994d1aa22")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.MONGO_URL).then(() => {
  // const newUser = new User({
  //   name: "Vishal",
  //   email: "vishal@gmail.com",
  //   cart: {
  //     items: [],
  //   },
  // });
  // newUser.save();
  app.listen(4000, () => {
    console.log(`The server is up at http://localhost:4000`);
  });
});
