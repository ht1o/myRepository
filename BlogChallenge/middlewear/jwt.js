const jwt = require('jsonwebtoken');
require('dotenv').config();


///////
const log = ((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
////////
  const ensureToken=(req, res, next)=> {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader === 'undefined') {
      res.sendStatus(403);
      
    } 
     
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.tokenUser, (err,data) => {
      if (err) {
        res.send('invalid token');
      } else {
        console.log(data)
        next()
      }
    });
    }
    

  module.exports = {log,ensureToken}