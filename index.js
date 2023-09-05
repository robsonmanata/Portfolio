 require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fs = require("fs");
const upload = require("express-fileupload");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "robsonmanata@gmail.com",
    pass: process.env.GMAILPASS_AUTHENTICATE1
  },
  tls: {
    rejectUnauthorized: false
  }
});


const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(upload());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/webdeveloper", (req, res) => {
  res.render("webdeveloper");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/websitedesign", (req, res) => {
  res.render("websitedesign");
});
app.get("/blog", (req, res) => {
  res.render("blog");
});
app.get("/messageSent", (req, res) => {
  res.render("messageSent");
});

app.post("/", function(req, res) {
      if (req.body.name) {
        console.log(req.body.name);
        var file = req.files.attachment;
        var filename = file.name;
        file.mv("./Uploads/" + filename, function(err) {
            if (err) {
              console.log(err);
            } else {
              var mailOptions = {
                from: req.body.emailaddress,
                to: "robsonmanata@gmail.com",
                subject: "message from rob-portfolio sent by " + req.body.emailaddress,
                text: "my name is " + req.body.firstname + " service requested [" + req.body.service + "]  " + req.body.message,
                attachments:[{
                  // path: '/path/to/file.txt'
                  // filename:req.files.name ,
                  //    content: req.files.data
                  filename: filename,
                  content: fs.createReadStream("./Uploads/" + filename)
                }]

              };

              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

               }
            });

            res.redirect("/messageSent");
          }
          else if (!req.body.name) {
            var mailOptions = {
              from: req.body.emailaddress,
              to: "robsonmanata@gmail.com",
              subject: "message from rob-portfolio sent by " + req.body.emailaddress,
              text: "my name is " + req.body.firstname + " service requested [" + req.body.service + "]  " + req.body.message,

            };

            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            res.redirect("/messageSent");

          }
          else{
            res.redirect("/");
          }
        });





      let port = process.env.PORT;
      if (port == null || port == "") {
        port = 3000;
      }

      app.listen(port, () => {
        console.log("server up and runing");
      });
      //env update
