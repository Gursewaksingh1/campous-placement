const express = require('express');
const homecontroller = require('../controllers/homepage');
const router = express.Router();
router.get('/', homecontroller.home)

router.get('/adminlogin', homecontroller.getadminlogin);
router.post('/adminlogin', homecontroller.postadminlogin );

router.get('/companylogin', homecontroller.getcompanylogin);
router.post('/companylogin', homecontroller.postcompanylogin );

router.get('/studentlogin', homecontroller.getstudentlogin);
router.post('/studentlogin', homecontroller.poststudentlogin );

router.get('/about-us', homecontroller.getaboutus);
router.get('/contact-us', homecontroller.getcontactus);

router.post('/logout', homecontroller.postlogout);
module.exports = router;