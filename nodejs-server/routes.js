const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authJwt = require('./app/middleware');
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (
    !req.originalUrl.endsWith('/signup') &&
      !req.originalUrl.endsWith('/login') &&
      !req.originalUrl.endsWith('/verifyOtp') &&
      req.originalUrl.startsWith('/api')
  ) {
    authJwt.verifyToken(req, res, next);
  } else return next();
});
app.get('/api/user', (req, res)=>{
  res.status(200).send({message: 'Hello User'});
});

app.use(async (err, req, res, next) => {
  handleError(err, res);
});
require('./app/features/auth/auth.routes')(app);
