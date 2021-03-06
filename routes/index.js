var express = require('express');
var router = express.Router();

// encoder
var jwt = require('jwt-simple');
var base64 = require('base64-js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'COOKIE MONSTER'
  });
});

router.post('/result', function(req, res, next){
    res.redirect('/results/' + req.body.base64Content);
});

router.get('/results/:q', function(req, res, next){
    if(req.params.q){

      var b64decoded = JSON.parse(new Buffer(decodeURIComponent(req.params.q), 'base64').toString('utf8'));
      var payload = b64decoded.access_token;
      var secret = 'xxx';

      var decoded = JSON.parse(new Buffer(decodeURIComponent(payload.split('.')[1]), 'base64').toString('utf8'))
      // /////

      res.render('results', {
        title: 'RESULTS',
        result: decoded,
        base: b64decoded

      })
    }
});


module.exports = router;
