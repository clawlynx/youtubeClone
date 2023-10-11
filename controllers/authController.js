import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { sendMail, transporter } from "../utilities/nodemailer.js";

//function to create a user
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      tryouts: 0,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    throw new Error(error);
  }
};

//function for credential login with security and authorization
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const jwtsecret = process.env.JWT_SECRET;
  try {
    const currentUser = await User.findOne({ email: email });

    if (currentUser) {
      let tries = currentUser.tryouts;
      if (tries === 5) {
        const existingblocktime = new Date(currentUser.blocktime);
        const currentDate = new Date();
        const timeremaining = currentDate - existingblocktime;
        //console.log(timeremaining);
        if (timeremaining < 3600000) {
          res.json({ msg: "account has been blocked please try later" });
          return;
        }
      }
      const isPassOk = await bcrypt.compare(password, currentUser.password);
      if (isPassOk) {
        await User.findOneAndUpdate({ email: email }, { tryouts: 0 });
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
        let newtries = tries + 1;
        await User.findOneAndUpdate({ email: email }, { tryouts: newtries });
        if (newtries === 3) {
          const mailOptions = {
            from: {
              name: "youTubeClone",
              address: process.env.MAIL_ID,
            },
            to: currentUser.email,
            subject: "Failed login Attempt",
            text: "Your account has encountered continuous 3 failed login attempts. After 5 attempts your account will be temporarily blocked for 1 hour",
          };
          await sendMail(transporter, mailOptions);
        }
        if (newtries === 3) {
          const mailOptions = {
            from: {
              name: "youTubeClone",
              address: process.env.MAIL_ID,
            },
            to: currentUser.email,
            subject: "Failed login Attempt",
            text: "Your account has encountered continuous 3 failed login attempts. After 5 attempts your account will be temporarily blocked for 1 hour",
          };
          await sendMail(transporter, mailOptions);
        }
        if (newtries < 5) {
          res.status(200).json({
            msg: `Incorrect password. You have ${5 - newtries} attempts left`,
          });
        }
        if (newtries === 5) {
          const mailOptions = {
            from: {
              name: "youTubeClone",
              address: process.env.MAIL_ID,
            },
            to: currentUser.email,
            subject: "Account Blocked",
            text: "Your account has been temporarily blocked for 1 hour due to continuous 5 login attempts. please login with the correct password after 1 hour",
          };
          await sendMail(transporter, mailOptions);
          const blocktime = new Date(Date.now());
          await User.findOneAndUpdate(
            { email: email },
            { blocktime: blocktime }
          );
          res.status(200).json({
            msg: `Incorrect password. your Account has been blocked for 1 hour`,
          });
        }
      }
    } else {
      res.json({
        msg: "No valid users with this email. Kindly register first",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

//function too get details of single user
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

//function to logout
export const signOutUser = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "successfully logout" });
};

// function for google signin
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

//function for getting watchhistory, liked, and watch later videos
export const getlwlwhVideos = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    try {
      const currentUser = await User.findById(userId).populate([
        "likedVideos",
        "watchLater",
        "history",
      ]);
      res.json(currentUser);
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.json(null);
  }
};

//function for removing watch later
export const removeWatchLater = async (req, res) => {
  const { userId } = req.body;
  if (userId) {
    try {
      const newwatch = [];
      const newUser = await User.findByIdAndUpdate(
        userId,
        { watchLater: newwatch },
        { new: true }
      );
      if (newUser) {
        res.status(200).json(newUser);
      } else {
        console.log("failed to delete all");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
};

//function for updating watch history
export const updateHistory = async (req, res) => {
  const { userId, videoId, isAdd } = req.body;
  if (userId) {
    if (isAdd === "add") {
      try {
        const currentUser = await User.findById(userId);
        if (currentUser) {
          let currentHistory = currentUser.history.map((id) => id.toString());
          currentHistory.push(videoId.toString());
          let currentHistoryrev = currentHistory.reverse();
          let currentHistory2 = new Set(currentHistoryrev);
          let currentHistory3 = Array.from(currentHistory2).map(
            (id) => new mongoose.Types.ObjectId(id)
          );
          let currentHistory3rev = currentHistory3.reverse();
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { history: currentHistory3rev },
            { new: true }
          ).populate("history");
          if (updatedUser) {
            res.status(200).json(updatedUser);
          } else {
            console.log("not updated");
          }
        } else {
          console.log("no user found");
        }
      } catch (error) {
        throw new Error(error);
      }
    } else if (isAdd === "remove") {
      try {
        const currentUser = await User.findById(userId);
        const newhistoryArr = currentUser.history;
        const newHistory = newhistoryArr.filter(
          (item) => item.toString() !== videoId
        );
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { history: newHistory },
          { new: true }
        ).populate("history");
        res.status(200).json(updatedUser);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

//function for clearing watch history
export const clearHistory = async (req, res) => {
  const { userId } = req.body;
  if (userId) {
    try {
      const newwatch = [];
      const newUser = await User.findByIdAndUpdate(
        userId,
        { history: newwatch },
        { new: true }
      );
      if (newUser) {
        res.status(200).json(newUser);
      } else {
        console.log("failed to delete all");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
};
