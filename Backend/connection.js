const mongoose = require("mongoose");
//Write missing code here
mongoose
  .connect(
   'mongodb+srv://rezil:passwrd123@cluster0.lfwfhmf.mongodb.net/codingdb?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });

