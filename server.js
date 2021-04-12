const express = require("express");
const fs = require("fs");
const fastcsv = require("fast-csv");
const mongoose = require("mongoose");
const path = require('path');
const User = require ('./models/usersSchema')


const app = express();

//init middleware
app.use(express.json());

//later
let url = "mongodb+srv://ChediDev:One23456@cluster0.cyzxl.mongodb.net/laser";

//connect mongoose
mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then (()=>console.log('mongoose 2 here'))



//path
const currDir = path.join(__dirname + '/./exports/');

//get the file names
const readdir = (dirname) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (error, filenames) => {
      if (error) {
        reject(error);
      } else {
        resolve(filenames);
      }
    });
  });
};

//filter the names
const filtercsvFiles = (filename) => {
  return filename.split('.')[1] === 'csv';
};

//loop directory
readdir(currDir).then((filenames) => {
  filenames = filenames.filter(filtercsvFiles);

  for (let i = 0; i < filenames.length; i++) {
    let currFilePath = currDir + filenames[i];


// csv files to json
let stream = fs.createReadStream(currFilePath);
let spliteddata = [] ;

let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    console.log(data)
    spliteddata = data[0].split(';')
    if (spliteddata[0] !== 'firstName') {

// post data in the schema
    var user = new User ({
      firstName: spliteddata[0],
      lastName: spliteddata[1],
      birthday: spliteddata[2],
      email: spliteddata[3],
      city: spliteddata[4],
      playOn: spliteddata[5],
      score: +(spliteddata[6]) 
    })
    user.save() }
  })
  .on("end", function() {
  });
stream.pipe(csvStream);

}
});


//define routes
app.use ("/", require ("./routes/users"))

//port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));