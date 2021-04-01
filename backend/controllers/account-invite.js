const sgMail = require("@sendgrid/mail");
const express = require("express");
const config = require("config");
const sendgridAPIKey = config.get("sendgridAPIKey");
const sendEmail = express.Router();
sgMail.setApiKey(sendgridAPIKey);

sendEmail.post("/", async (req, res, next) => {
  const { email } = req.body;

  sgMail.send({
    to: email,
    from: "telakshanb@gmail.com",
    subject: "Sign up for flow state",
    text: `Hey, Your team member would 
           like you to sign up for 
           Flow State @ flowstate.com.
           `,
  });
});

module.exports = sendEmail;
