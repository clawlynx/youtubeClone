import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.net",

  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

/*const mailOptions = {
    from: {
        name: "youTubeClone",
        address: process.env.MAIL_ID
    },
    to: ""
}*/

export const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("mail sent");
  } catch (error) {
    console.log(error);
  }
};
