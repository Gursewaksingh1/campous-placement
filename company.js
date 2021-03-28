const Company = require('../model/company');
const Resume = require('../model/student-resume');
exports.gethome = (req, res, next) => {
   res.render('companies/home', {
       pageTitle: 'home',
       path: 'companies/home',
       
   }) 
}

exports.getothercompanies = (req, res, next) => {
    Company.find()
        .then(companies => {
            res.render('companies/all-companies', {
                pageTitle: 'Other-Companies',
                path: '/company/other-companies',
                prods: companies,
                editing: false,
                foradmin: false
            })
        })
        .catch(err => console.log(err))
    
}
exports.getallresume = (req, res, next) => {
    Resume.find()
        .then(resume => {
            res.render('companies/showallresume', {
                pageTitle: 'student-resume',
                path: 'student-resume',
                prods: resume
            })
        })
        .catch(err => console.log(err))
}