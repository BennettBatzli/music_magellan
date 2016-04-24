var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {
    console.log('authentication 1');
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log('strategy: no user');
      return res.json({
        err: info.message
      });
    }
    req.logIn(user, function(err) {
      console.log('authentication 3', user);

      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      return res.json(user);
    });
  })(req, res, next);
});

module.exports = router;
