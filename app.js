const express = require("express");
const request = require('https');
const bodyParser = require("body-parser");

const app = express();

// allows you to use files stored on your computer to display on public page
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
res.sendFile(__dirname + "/signup.html")
});

app.post("/", (req, res) => {
  let firstName = req.body.fname;
  let lastName =  req.body.lname;
  const email =   req.body.email;

  console.log(firstName, lastName, email);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
