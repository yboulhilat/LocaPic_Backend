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
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),

  function (req, res) {

    res.redirect(req.user.redirectUrl
      + "?userId=" + req.user.id
      + "&firstName=" + req.user.first_name
      + "&lastName=" + req.user.last_name
      + "&email=" + req.user.email
      + "&picture=" + encodeURIComponent(req.user.picture.data.url));
    UserModel.findOne({
      facebookid: req.user.id,
    }, function (err, user) {
      if (!user) {
        var newUser = new UserModel({
          firstname: req.user.first_name,
          lastname: req.user.last_name,
          email: req.user.email,
          picture: req.user.picture.data.url,
          facebookid: req.user.id
        });
        newUser.save(
          function (err, user) {
            res.json({ result: true, user });
          });
      }
    });
  });

/* logPosition.*/
router.post('/logPosition', function (req, res, next) {
  UserModel.findOne({
    facebookid: req.body.facebookid,
  }, function (err, user) {
      user.historiquePosition.push({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });

    user.save(
      function (err, position) {
        console.log(position)
        res.json({ result: true });
      });
  });
});

router.get('/logPosition', function (req, res) {
  UserModel.findOne({ facebookid: req.query.facebookid }, function (err, user) {
    if (user) {
      res.json({ historiquePosition: user.historiquePosition });
    } else {
      res.json({ historiquePosition: [] });
    }
  })
}
)
module.exports = router;
