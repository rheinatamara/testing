require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: process.env.DEPLOYED_FRONTEND }));
app.use(express.json({ limit: "10mb" }));
app.post("/send-email", async (req, res) => {
  try {
    const { message, score, drawings } = req.body;

    if (!drawings || drawings.length !== 3) {
      return res.status(400).json({ message: "Provide me 3 drawings" });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = drawings.map((image, index) => ({
      filename: `drawing_${index + 1}.png`,
      content: image.split(";base64,")[1],
      encoding: "base64",
    }));

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // this is where you wish you get the letter, files and score data
      subject: "Drawings and letter for you",
      text: `${message}\n\n${score}`,
      attachments: attachments,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
