const express = require('express')
const app = express()
const port = 3000
const user = require("./routes/User_main")
const addpost = require("./routes/addPost")
const path = require('path')
app.set('view engine', 'ejs');
const multer = require("multer");
app.use(express.static('public'));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/images',express.static(path.join(__dirname,"images")));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/user", user)
app.use("/user", addpost)
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.redirect("/user/login")
})
app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})                                                                     
