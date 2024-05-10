const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1:27017/guiderDB",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
//creat schema
const registrationSchema = {
  name: String,
  email: String,
  number: Number,
  occupation : String
};
//mongoose model
const Registration = mongoose.model("user", registrationSchema);



app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
 
    res.render("home");
  
});



// registration form
app.post("/registration", function (req, res) {
  const registration = new Registration({
    name: req.body.name,
    email: req.body.email,
    number:req.body.number,
    occupation : req.body.occupation

  });

  // composed blog gets saved and the user is redirected to "/" route
  registration.save(function (err) {
    if (!err) {
      res.render("thanku");
    }
  });
});

app.get("/course",function(req,res){
  res.render("course")
})

app.listen(3001, function () {
    console.log("Server started at 3000 port");
  });
  