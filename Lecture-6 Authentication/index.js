const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./UserSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const PORT = 8001;
const SALT_ROUNDS = 10;

app.use(express.json());

// POST - Creating new User
app.post("/signup", async (req, res) => {
  try {
    const userBody = req.body;
    const hashedPassword = await bcrypt.hash(userBody.password, SALT_ROUNDS);

    const userObj = new User({
      username: userBody.username,
      password: hashedPassword,
      email: userBody.email,
    });

    await userObj.save();

    res.status(200).send("User has been created!");
  } catch (e) {
    res.status(500).send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const loginBody = req.body;
    const userData = await User.findOne({ username: loginBody.username });

    const isPasswordSame = await bcrypt.compare(
      loginBody.password,
      userData.password
    );

    if (!isPasswordSame) {
      res.status(400).send("Your password is incorrect");
    } else {
      res.status(200).send("You are logged in!");
    }
  } catch (e) {
    res.status(500).send("Internal server error!");
  }
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
