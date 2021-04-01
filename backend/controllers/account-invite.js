const sgMail = require("@sendgrid/mail");
const express = require("express");
const config = require("config");
const sendgridAPIKey = config.get("sendgridAPIKey");
const sendEmail = express.Router();
sgMail.setApiKey(sendgridAPIKey);

sendEmail.post("/", async (req, res, next) => {
  const { inviteEmail } = req.body;
  try {
    await sgMail.send({
      to: inviteEmail,
      from: "telakshanb@gmail.com",
      subject: "Sign up for flow state",
      text: `Hey, Your team member would 
                   like you to sign up for 
                   Flow State @ flowstate.com.
                   `,
    });
  } catch (error) {
    console.log(error, "Cannot send email");
  }
});

module.exports = sendEmail;
