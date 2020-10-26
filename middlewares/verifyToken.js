const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

module.exports = async (req, res, next) => {
  // ambil token dari headers
  const token = req.headers.authorization;

  // cek token valid
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err){
      return res.status(403).json({
        message: err.message
      });
    }

    req.user = decoded;
    return next();
  })
}