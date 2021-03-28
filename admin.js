const bcrypt = require('bcrypt');
const Student = require('../model/student')
const Company = require('../model/company')
const Admin = require('../model/admin');
const { findById } = require('../model/admin');

exports.adminhomepage = (req, res, next) => {
  res.render('homepage/homepage', {
    pageTitle: 'admin-home-page',
    path: 'homepage',
    admin: true
  })
}
exports.getallstudents = (req, res, next) => {
    Student.find()
    .then((products) => {
      res.render('admin/getallstudent', {
        prods: products,
        pageTitle: 'All students',
        path: '/product',
      })
    })
}

exports.geteditstudent = (req, res, next) => {
  const studentid = req.params.studentid;
  Student.findById(studentid)
    .then(product => {
      res.render('student/add-student', {
        pageTitle: 'Update-student',
        path: '/update-student',
        editing: true,
        product: product
      })
    })
    .catch(err => console.log(err))
}

exports.posteditstudent = (req, res, next) => {
  const studentid = req.body.studentid;
  const updatedname = req.body.name;
  const updatedemail  = req.body.email;
  const updatedstream = req.body.stream;
  const updatedinWhichYear = req.body.inWhichYear
  Student.findById(studentid)
    .then(student => {
      student.name = updatedname;
      student.email = updatedemail;
      student.stream = updatedstream;
      student.inWhichYear = updatedinWhichYear;
      student.save();
    })
    .then(() => {
      res.redirect('/admin/all-students')
    })
    .catch(err => console.log(err))
}

exports.postdeletestudent = (req, res, next) => {
  const studentid = req.body.studentid;
  console.log(studentid)
  Student.findByIdAndRemove(studentid).then(result => {
    console.log('deleted');
    res.redirect('/admin/all-students');
  })
  .catch(err => console.log(err))
}
exports.getaddcompany = (req, res, next) => {
  res.render('companies/add-company', {
      pageTitle: 'add-company',
      path: '/add-company',
      editing: false
  })
}

exports.postaddcompany = (req, res, next) => {
  const nameOfCompany = req.body.nameOfCompany;
  const email = req.body.email;
  const password = req.body.password;
  const ownerName = req.body.ownerName;
  const aboutCompany = req.body.aboutcompany;

  Company.findOne({ email: email })
    .then(company => {
      if (!company) {
        bcrypt.hash(password, 12)
        .then(password => {
          const company = new Company({
            nameOfCompany,
            email,
            password,
            ownerName,
            aboutCompany
          })
          company.save();     
        })
        .then(() => {
          res.redirect('admin/all-companies')
        })
     
      } else {
          res.redirect('/admin/addcompany')
      }
    })
    .catch(err => console.log(err))
  
}

exports.getallcompanies = (req, res, next) => {
  Company.find()
  .then(company => {
    res.render('companies/all-companies', {
      pageTitle: 'allCompanies',
      editing: false,
      prods: company,
      foradmin: true,
      path: '/admin/all-companies'
    })
  })
  .catch(err => console.log(err))
}

exports.geteditcompany = (req, res, next) => {
  const companyid = req.params.companyid;
  Company.findById(companyid)
  .then(product => {
    if(!product) {
      res.redirect('/');
    }
    res.render('companies/add-company', {
      pageTitle: 'update',
      path: '/updatee',
      editing: true,
      product: product
    })
  })
  .catch(err => console.log(err))
}

exports.posteditcompany = (req, res, next) => {
  const updatednameOfCompany = req.body.nameOfCompany;
  const updatedemail = req.body.email;
  const updatedownerName = req.body.ownerName;
  const updatedaboutCompany = req.body.aboutcompany;
  const companyid = req.body.companyid;
  Company.findById(companyid)
  .then(company => {
    company.nameOfCompany = updatednameOfCompany;
    company.email = updatedemail;
    company.ownerName = updatedownerName;
    company.aboutCompany = updatedaboutCompany;
    company.save();
  })
  .then(() => {
    res.redirect('/admin/all-companies');
  })
  .catch(err => console.log(err))
}

exports.postdeletecompany = (req, res, next) => {
  //console.log('hhhhhh')
  const companyid = req.body.companyid;
  // console.log(companyid)
  Company.findByIdAndRemove(companyid)
  .then(ressult => {
    //console.log('delected');
    res.redirect('/admin/all-companies')
  })
  .catch(err => console.log(err))
}

exports.getalladmin = (req, res, next) => {
  Admin.find()
    .then(admin => {
      res.render('admin/all-admin', {
        pageTitle: 'all-admin',
        prods: admin,
        editing: false,
        path: 'all-admin'
      })
    })
}

exports.postdeleteadmin = (req, res, next) => {
  //console.log('hhhhhh')
  const adminid = req.body.adminid;
  console.log(adminid)
  Admin.findByIdAndRemove(adminid)
  .then(ressult => {
    //console.log('delected');
    res.redirect('/admin/all-admin')
  })
  .catch(err => console.log(err))
}
exports.getaddadmin = (req, res, next) => {
  res.render('admin/addadmin', {
    pageTitle: 'add-admin',
    path: '/admin/add-admin',
    editing: false
  })
}

exports.postaddadmin = (req, res, next) => {
  
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const sinceInCompany = req.body.sinceInCompany;
  const contactNo = req.body.ContactNo;
  const address = req.body.address;
  Admin.findOne({ email: email })
    .then(admin => {
      if (!admin) {
        console.log(password)
        bcrypt
          .hash(password, 12)
          .then(password => {
            const admin = new Admin({
              name,
              email,
              password,
              sinceInCompany,
              contactNo,
              address
                })
          admin.save();
          })
          .then(() => {
            res.redirect('/admin');
          })
        
      }
      else {
        return res.redirect('/admin/add-admin');
      }
    })
    .catch(err => console.log(err))
  
}