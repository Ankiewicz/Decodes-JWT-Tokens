var express = require('express');
var router = express.Router();

// encoder
var jwt = require('jwt-simple');
var base64 = require('base64-js')

/* GET home page. */
router.get('/', function(req, res, next) {
  let encode = "encode1";
  res.render('index', {
    title: 'COOKIE MONSTER'
  });
});

router.post('/result', function(req, res, next){
  console.log(req.body.base64Content);
    res.redirect('/results/' + req.body.base64Content);
});

router.get('/results/:q', function(req, res, next){
    if(req.params.q){

      var b64decoded = JSON.parse(new Buffer(decodeURIComponent(req.params.q), 'base64').toString('utf8'));
      var payload = b64decoded.access_token;
      console.log('********',payload)
      var secret = 'xxx';

      var decoded = JSON.parse(new Buffer(decodeURIComponent(payload.split('.')[1]), 'base64').toString('utf8'))
      console.log("decoded--------",decoded) //=> { foo: 'bar' }
      // /////
      console.log('access_token ',decoded.access_token)

      res.render('results', {
        title: 'RESULTS',
        result: decoded,
        base: b64decoded

      })
    }
});


module.exports = router;

//example object for testing -- eyJhY2Nlc3NfdG9rZW4iOiAiZXlKaGJHY2lPaUpTVXpJMU5pSjkuZXlKc1lYTjBUbUZ0WlNJNklrcHZibVZ6SWl3aWMyTnZjR1VpT2xzaWNtVmhaQ0lzSW5keWFYUmxJbDBzSW5CaGNuUjVYMmxrSWpveE9UUXlNak1zSW1GalkyOTFiblJmWTI5dVptbHliU0k2ZEhKMVpTd2lkWE5sY2w5dVlXMWxJam9pWkhOcVFHUnphaTV0WlNJc0ltVjRjQ0k2TVRRM09EYzBPRGN6TlN3aWRYTmxjbTVoYldVaU9pSWlMQ0poZFhSb2IzSnBkR2xsY3lJNld5SlNUMHhGWDFWVFJWSWlYU3dpWVhWa0lqcGJJa0ZFUXlKZExDSldTVkJUWld4c1pYSkJiR3h2ZDJWa0lqcHVkV3hzTENKcWRHa2lPaUk0WlRBNVkyUmpaaTB6WXpreUxUUXlZakl0WVRGak9DMDRZV0kyTldRNU9XSm1NRFVpTENKMWMyVnlYMmxrSWpveU1UTXhNVGN5TENKamJHbGxiblJmYVdRaU9pSjRlWHBEVWtWWFpXSkRiR2xsYm5RaUxDSm1hWEp6ZEU1aGJXVWlPaUpFWVhabEluMC5ocXNfTEQxSEdFa3BJQk5qclltcENpTUloYlpDZjZtZ1JaT0R0U3NXYmdNQzl0VnFNMmZNX3h0X1Rpbk9xX1RmQURoNmlZcVdoWDJHMXhfbVVPUlBDaUNveE55engxUGp2VUhWc19YZkZoTDdlY3M0aEIxWUNaZktYekFYZ3lDV2MxN29rXzJ5U0o3QnBkRTlCMHlHSVlHdVEtZW1EcFhSNmxBckdQb0FsZk9lTzVBYldQTEN5a1BCOVNLS3U1YXQzb19SLWZLbHZQOVYtOWwwM1VxX2J0a3JvVEhzZm5MUTB5d2h4UHA5ZTZKRlc0Q3FodUUtMlVFMzJoZlBwVU0tNkF0OVNBX1Q2WUVWRkdDNmtpWmd1ODQ5enFpZ1JteEpINGp0UG9IOE5HUnJ3bUVqOTlPZ0FXcWVOTl9XeFdZdWxVVHBoZ290aHhfbUtCWmVSdG1zWUEiLCAidGltZV9vZl9pc3N1ZSI6ICIyMDE2LTExLTEwVDAyOjMyOjE1LjI0OTAxNiswMDowMCIsICJleHBpcmVzX29uIjogIjIwMTYtMTEtMTBUMDM6MzI6MDIuMjQ5MDE2KzAwOjAwIiwgInJlZnJlc2hfdG9rZW4iOiAiZXlKaGJHY2lPaUpTVXpJMU5pSjkuZXlKc1lYTjBUbUZ0WlNJNklrcHZibVZ6SWl3aWMyTnZjR1VpT2xzaWNtVmhaQ0lzSW5keWFYUmxJbDBzSW5CaGNuUjVYMmxrSWpveE9UUXlNak1zSW1GalkyOTFiblJmWTI5dVptbHliU0k2ZEhKMVpTd2lkWE5sY2w5dVlXMWxJam9pWkhOcVFHUnphaTV0WlNJc0ltVjRjQ0k2TVRRM09EZzFNVEU1T1N3aWRYTmxjbTVoYldVaU9pSWlMQ0poZFhSb2IzSnBkR2xsY3lJNld5SlNUMHhGWDFWVFJWSWlYU3dpWVhWa0lqcGJJa0ZFUXlKZExDSldTVkJUWld4c1pYSkJiR3h2ZDJWa0lqcHVkV3hzTENKcWRHa2lPaUkzTkdabVltVXdPUzB3WlRBNUxUUTRNMk10T1dFM1pDMW1OalZrTlRZMk5EaGtNMllpTENKMWMyVnlYMmxrSWpveU1UTXhNVGN5TENKamJHbGxiblJmYVdRaU9pSjRlWHBEVWtWWFpXSkRiR2xsYm5RaUxDSmhkR2tpT2lJNFpUQTVZMlJqWmkwell6a3lMVFF5WWpJdFlURmpPQzA0WVdJMk5XUTVPV0ptTURVaUxDSm1hWEp6ZEU1aGJXVWlPaUpFWVhabEluMC5STl9ZcDZUOXNzay1FdGlSYm44elZVdTlrMWltVktuUUdycXRrd2NMUWwxOExrREotX2VVVmJCVjNPb25PaF9RYkk2aWdYYzBodXdBWTM5RjFLSFpmYmU4LXBJNzZEUlVLOTA5djdYQmxIUWNYYTVzMTFoV1hna29qUGNwcmtaVzg0ZFFpWXlYTUtqWDZTdEs5cTMxM3M4VHZpZFdKY0FuZzRZdEwxRE1XQ2tGSWxTZGdvMjFJMC1YeUFqZEtoS3dYWnA1Wl9XdlNsY3YwaXEwemdZMnZmTW15c21sWnN1OENYX1hJYU14cGx5MUkyWW8xdlpZOXI5QnhGTmVKUFg4bWFCMXJLcEYyUDVjRTRqM1VXWEY2Q0I5dFJaYVJwT2daV25BYU5uWUhzMjZzbW5xMEhzY1Z3cXBOZ1ZQM3NmRGRlSU1RU3NlWnNMS09JUUFaeXJkZkEifQ==
