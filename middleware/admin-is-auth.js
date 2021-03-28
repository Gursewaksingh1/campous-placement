module.exports = (req, res, next) => {
    if (!req.session.isloginedadmin) {
    res.redirect('/adminlogin');
          }
          next();
}