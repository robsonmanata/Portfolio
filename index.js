const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");


const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req, res)=> {
  res.render("home");
});
app.get("/about",(req, res)=> {
  res.render("about");
});
app.get("/contact",(req, res)=> {
  res.render("contact");
});
app.get("/portfolio",(req, res)=> {
  res.render("portfolio");
});
app.get("/blog",(req, res)=> {
  res.render("blog");
});
let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port,()=>{
  console.log("server up and runing");
});
