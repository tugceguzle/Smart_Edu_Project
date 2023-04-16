 module.exports = (req, res, next) => {
    if (req.session.userID) {
      return res.redirect('user/dashboard');
    }
    next();
  };