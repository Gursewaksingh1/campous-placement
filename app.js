const path = require('path');

const express = require('express');
const app = express();

const session = require('express-session');
const MongoDB_store = require('connect-mongodb-session')(session)
const bodyparser = require('body-parser');
const flash = require('connect-flash');
const csrf = require('csurf');

const Admin = require('./model/admin')
const Company = require('./model/company')
const Student = require('./model/student')

const errorcontroller = require('./controllers/error');
const mongoose = require('mongoose');
//const mongoconnect = require('./util/database').mongoconnect
const adminrouter = require('./routes/admin');
const studentrouter = require('./routes/student');
const companyrouter = require('./routes/company');
const homepage = require('./routes/homepage');

app.set('view engine', 'ejs');
app.set('views', 'views');

// const csrfProduction = csrf();

const _URI = 'mongodb://127.0.0.1:27017/campus';
const store = new MongoDB_store({
  uri: _URI,
  collection: 'session',
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: false }));

//app.use(csrfProduction)
app.use(flash());

app.use(session({ 
  secret: 'this my secret', 
  resave: false,
  saveUninitialized: false,
  store: store
 } 
 ))


// app.use((req, res, next) => {
//   //res.locals.csrfToken = req.csrfToken();;
//   next();
// });
app.use((req, res, next) => {
  if (!req.session.admin) {
    return next();
  }
  Admin.findById(req.session.admin._id)
    .then(admin => {
      req.admin = admin;
      next();
    })
    .catch(err => {
      console.log(err);
    })
})

app.use((req, res, next) => {
  if (!req.session.company) {
    return next();
  }
  Company.findById(req.session.company._id)
    .then(company => {
      req.company = company;
      next();
    })
    .catch(err => {
      console.log(err);
    })
})

app.use((req, res, next) => {
  if (!req.session.student) {
    return next();
  }
  Student.findById(req.session.student._id)
    .then(student => {
      req.student = student;
      next();
    })
    .catch(err => {
      console.log(err);
    })
})



app.use('/admin', adminrouter);
app.use('/student', studentrouter);
app.use(homepage)
app.use('/company', companyrouter);
app.use(errorcontroller.error)

mongoose.connect(_URI)
  .then(result => {
      console.log('connected')
        
    app.listen(3000);
  })
  .catch(err => console.log(err))
