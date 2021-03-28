module.exports = (req, res, next) => {
    if (!req.session.isloginedstudent) {
        res.redirect('/studentlogin');
    }
    next();
}