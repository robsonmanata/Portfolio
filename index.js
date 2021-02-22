require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fs = require("fs");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "robsonmanata@gmail.com",
    pass: process.env.GMAILPASS_AUTHENTICATE
  },
  tls: {
         rejectUnauthorized: false
     }
});


const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req, res)=> {
  res.render("home");
});

app.get("/webdeveloper",(req, res)=> {
  res.render("webdeveloper");
});
app.get("/contact",(req, res)=> {
  res.render("contact");
});
app.get("/websitedesign",(req, res)=> {
  res.render("websitedesign");
});
app.get("/blog",(req, res)=> {
  res.render("blog");
});

app.post("/",function(req,res){
  if(req.body.message){

    var mailOptions = {
    from: req.body.emailaddress,
    to: "robsonmanata@gmail.com",
    subject:"message from rob-portfolio sent by " + req.body.emailaddress,
    text:"my name is " + req.body.firstname + " service requested [" + req.body.service + "]  " +req.body.message,
    attachments: [
       {

         filename:req.body.attachment ,
            content: req.body.attachment
         // filename: req.body.attachment,
         //  content: fs.createReadStream("Downloads/" + req.body.attachment)
       }
     ]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
console.log(req.body.attachment);
  res.redirect("/");
  }
  else{
    res.redirect("/");
  }

});


let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port,()=>{
  console.log("server up and runing");
});
