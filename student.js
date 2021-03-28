const Student = require('../model/student');
const Company = require('../model/company');
const bcrypt = require('bcrypt');
const AddResume = require('../model/student-resume') 
exports.getaddstudent = (req, res, next) => {
    res.render('student/add-student', {
        pageTitle: 'add-student',
        path: '/add-student',
        editing: false
    })
}

exports.postaddstudent = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const stream = req.body.stream;
    const inWhichYear = req.body.inWhichYear;
    Student.findOne({ email: email })
        .then(student => {
            if (!student) {
                bcrypt
                .hash(password, 12)
                .then(password => {
                    const student = new Student({
                        name, 
                        email,
                        password, 
                        stream, 
                        inWhichYear
                    });
                    student.save();
                })
                .then(() => {
                    res.redirect('/studentlogin');
                })
           
            } else {
                res.redirect('/student/addstudent');
            }
        })

}

exports.gethome = (req, res, next) => {
    res.render('student/home', {
        pageTitle: 'student-homepage',
        path: 'home'
    })
}

exports.getstudentdetail = (req, res, next) => {
 const studentid = req.student._id;
 Student.findById(studentid)
    .then(student => {
        res.render('student/student-detail', {
            path: 'student-detail',
            pageTitle: 'student-detail',
            product: student,
            editing: true
        })
    })
    .catch(err => console.log(err))   
}
exports.poststudentdetail = (req, res, next) => {
    const updname = req.body.name;
    const updemail = req.body.email;
    const updstream = req.body.stream;
    const updinWhichYear = req.body.inWhichYear;
    const studentid = req.body.studentid
    Student.findById(studentid)
        .then(student => {
            student.name = updname;
            student.email = updemail; 
            student.stream = updstream;
            student.inWhichYear = updinWhichYear;
            student.save();
        })
        .then(() => {
            res.redirect('/student/student-detail');
        })
}
exports.getaddresume = (req, res, next) => {
    res.render('student/add-resume', {
        pageTitle: 'add-resume',
        editing: false,
        path: 'addresume'
    })
}

exports.postaddresume = (req, res, next) => {
    const marticsMarks = req.body.marticsMarks;
    const secondaryMarks = req.body.secondaryMarks;
    const gradutionMarks = req.body.gradutionMarks;
    const experience = req.body.experience;
    const imageUrl = req.body.imageUrl;
    const  Studentid = req.student._id;
    const addresume = new AddResume({
    marticsMarks,
    secondaryMarks,
    gradutionMarks,
    experience,
    imageUrl,
    Studentid,
    })
    addresume.save();
}

exports.getviewcompanies = (req, res, next) => {
    Company.find()
        .then(result => {
            res.render('student/view-companies', {
                pageTitle: 'All-companies',
                path: 'all-companies',
                foradmin: false,
                prods: result
            })
        })
}