const express = require('express');
const studentcontroller = require('../controllers/student');
const isauth = require('../midlleware/student-is-auth');

const router = express.Router();

router.get('/addstudent', studentcontroller.getaddstudent);
router.post('/addstudent', studentcontroller.postaddstudent)

router.get('/', isauth, studentcontroller.gethome);

router.get('/student-detail', isauth, studentcontroller.getstudentdetail);
router.post('/student-detail', isauth, studentcontroller.poststudentdetail);

router.get('/add-resume', isauth, studentcontroller.getaddresume)
router.post('/add-resume', isauth, studentcontroller.postaddresume)

router.get('/view-company', isauth, studentcontroller.getviewcompanies)
module.exports = router;
