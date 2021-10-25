const express = require("express");
const request = require('https');
const bodyParser = require("body-parser");
const https = require('https');

const app = express();



// allows you to use files stored on your computer to display on public page
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/f16cd768cb"

  const options = {
    method: "POST",
    auth: "rachel:2bdedd32022c74581bf9e12155d9d3b2-us5"
  }

  const request = https.request(url, options, (response) => {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/")
});


app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
