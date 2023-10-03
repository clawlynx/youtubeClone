import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    throw new Error(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const jwtsecret = process.env.JWT_SECRET;
  try {
    const currentUser = await User.findOne({ email: email });
    console.log(currentUser);
    if (currentUser) {
      const isPassOk = await bcrypt.compare(password, currentUser.password);
      if (isPassOk) {
        const token = jwt.sign(
          {
            userId: currentUser._id,
            userEmail: currentUser.email,
          },
          jwtsecret,
          {
            expiresIn: "1d",
          }
        );

        const oneDay = 1000 * 60 * 60 * 24;
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + oneDay),
          secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ msg: "loginSuccessfull" });
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    try {
      const currentUser = await User.findById(userId);
      res.json(currentUser);
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.json(null);
  }
};

export const signOutUser = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "successfully logout" });
};

export const googleSignIn = async (req, res) => {
  const { username, email, image } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const newUser = new User({
        email,
        username,
        image,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          userId: newUser._id,
          userEmail: newUser.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      const oneDay = 1000 * 60 * 60 * 24;
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ msg: "loginSuccessfull" });
    } else {
      const token = jwt.sign(
        {
          userId: existingUser?._id,
          userEmail: existingUser?.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      const oneDay = 1000 * 60 * 60 * 24;
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ msg: "loginSuccessfull" });
    }
  } catch (error) {
    throw new Error(error);
  }
};
