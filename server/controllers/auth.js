import User from "../models/user";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) return res.status(400).send("Name is mandatory");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is mandatory and should be min 6 character");

  let userExists = await User.findOne({ email }).exec();
  if (userExists) return res.status(400).send("Email is taken");

  const user = new User(req.body);
  try {
    await user.save();
    console.log("User Created");
    return res.json({ ok: true });
  } catch (error) {
    console.log("Create User Failed", error);
    return res.status(400).send("Error. Try Again");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).exec();
    console.log("User Exists", user);
    if (!user) res.status(400).send("User With this email not found");
    user.comparePassword(password, (err, match) => {
      if (!match || err) res.status(400).send("Wrong Password");
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    });
  } catch (err) {
    console.log("Login Error", err);
    res.status(400).send("Login Failed");
  }
};
