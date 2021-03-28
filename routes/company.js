const express = require('express');
const companycontroller = require('../controllers/company');
const isauth = require('../midlleware/company-is-auth');
const router = express.Router();

router.get('/', isauth, companycontroller.gethome);
router.get('/other-companies', isauth, companycontroller.getothercompanies)
router.get('/all-resume', isauth, companycontroller.getallresume);
module.exports = router;
