var express = require('express');
var router = express.Router();
var passport = require('passport');
var UserModel = require('../models/users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET facebook auth. */
router.get('/auth/facebook',
  function (req, res, next) {
    passport.authenticate(
      'facebook', { scope: 'email', state: JSON.stringify(req.query) }
    )(req, res, next);
  }
);

/* GET facebook callback. */
/* GET facebook callback. */
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),

  function (req, res) {
    
    res.redirect(req.user.redirectUrl
      + "?userId=" + req.user.id
      + "&firstName=" + req.user.first_name
      + "&lastName=" + req.user.last_name
      + "&email=" + req.user.email)
    UserModel.findOne({
      facebookid: req.user.id,
    }, function (err, user) {
        if (!user) {
          var newUser = new UserModel({
            firstname: req.user.first_name,
            lastname: req.user.last_name,
            email: req.user.email,
            facebookid: req.user.id
          });
          newUser.save(
            function (err, user) {
              res.json({ result: true, user });
            }); 
      }
  });
  });



/* GET logPosition page. */
router.post('/logPosition', function (req, res, next) {
  UserModel.findOne({
    facebookid: req.user.id,
  }, function (err, user) {
      user.historiquePosition.push({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });

    user.save(
      function (err, msg) {
        console.log(msg)
        res.render('index', {
          title: 'Messages'
        });
      });
  });
});
module.exports = router;
