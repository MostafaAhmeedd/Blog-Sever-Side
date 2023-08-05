const express = require('express')
const app = express()
const port = 3000
const user = require("./routes/User_main")
const addpost = require("./routes/manageposts")
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(session({
  secret: 'Secret',
  resave: false,
  saveUninitialized: false,}));

app.use(cookieParser());
app.use('/images',express.static(path.join(__dirname,"images")));
app.use(express.static('public'));
app.set('view engine', 'ejs');
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
