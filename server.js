const express = require("express");
const app = express();
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const bodyParser = require("body-parser");

const port = 7000;
app.use(bodyParser.json());

const sendMail = (userDetails) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sandhani.sk45@gmail.com", // generated ethereal user
      pass: "980861E528BE909E8230450A109BE6D3C52A", // generated ethereal password
    },
  });
  var mailOptions = {
    from: "sandhani.sk45@gmail.com", // sender address
    to: userDetails.email, // list of receivers
    subject: "Welcome!",
    template: "email", // the name of the template file i.e email.handlebars
    //   context: {
    //     name: "Adebola", // replace {{name}} with Adebola
    //     company: "My Company", // replace {{company}} with My Company
    //   },
    text: "Plaintext version of the message",
    html: `
      <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body: {
                color: black;
            }
        </style>
    </head>
    <body>
        <div style="border: 1px solid black;  width: 100%">
            <div style="padding:30px;">
               
                <p style="font-family: Verdana;">Hi, </p>
                <br>
                <p style="font-weight: 100; font-size: 16px ; line-height: 37px;  font-family: Verdana; color: #1C1E3A; font-family: Verdana;">Thanks for registering the Appointment. Will Get back Soon </p>
                <br>
                <div style="background: transparent linear-gradient(90deg, #2BAD90 0%, #00489A 100%) 0% 0% no-repeat padding-box;
                            background: transparent linear-gradient(90deg, #2BAD90 0%, #00489A 100%) 0% 0% no-repeat padding-box;
                            width: 497px; height: 300px; color: white; padding: 1px 0 10px 0;">
                        <p style="text-align: center; font-weight: 100; font-size: 20px ; line-height: 57px;  font-family: Verdana; margin: 0px;">Welcome World ${userDetails.name}</p>
                        <p style="text-align: center; font-weight: 100; font-size: 50px ; line-height: 57px;  font-family: Verdana;  margin: 0px;">For more call: 9999999999</p>
                </div>
                <br>
                <br>
            </div>
                
        </div>
    </body>
    </html>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};

app.post("/send-mail", (req, res) => {
  console.log("-------------------------", req.body);
  res.status(200).send({
    status: "200",
    message: "Mail Sent!",
  });
  sendMail(req.body.userDetails);
});

app.listen(port, () => {
  console.log(`server up to ${port}`);
});
