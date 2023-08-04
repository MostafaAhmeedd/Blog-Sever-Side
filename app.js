const express = require('express')
const app = express()
const port = 4000
const user = require("./routes/User_main")
const addpost = require("./routes/manage_posts")
const path = require('path')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", user)
app.use("/user", addpost)
app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})                                                                     
