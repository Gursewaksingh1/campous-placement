const express = require('express');
const admincontroller = require('../controllers/admin');
const isauth = require('../midlleware/admin-is-auth');
const router = express.Router();

router.get('/', isauth, admincontroller.adminhomepage)
router.get('/all-students', isauth, admincontroller.getallstudents);
router.get('/edit-student/:studentid', isauth, admincontroller.geteditstudent);
router.post('/edit-student', isauth, admincontroller.posteditstudent);
router.post('/delete-student', isauth, admincontroller.postdeletestudent);

router.get('/addcompany', isauth, admincontroller.getaddcompany)
router.post('/addcompany', isauth, admincontroller.postaddcompany)

router.get('/all-companies', isauth, admincontroller.getallcompanies);

router.get('/edit-company/:companyid', isauth, admincontroller.geteditcompany)
router.post('/edit-company', isauth, admincontroller.posteditcompany)

router.post('/delete-company', isauth, admincontroller.postdeletecompany)

router.get('/all-admin', admincontroller.getalladmin);
router.post('/delete-admin', admincontroller.postdeleteadmin);
router.get('/add-admin', isauth, admincontroller.getaddadmin);
router.post('/add-admin', isauth, admincontroller.postaddadmin);
module.exports = router;
