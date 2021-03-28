module.exports = (req, res, next) => {
    if (!req.session.isloginedcompany) {
        res.redirect('/companylogin');
    }
    next();
}