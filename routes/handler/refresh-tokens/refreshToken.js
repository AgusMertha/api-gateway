const jwt = require('jsonwebtoken');

const apiAdapter = require('../../apiAdapter');
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    // cek apakah email dan token dikirim oleh front end
    if(!refreshToken || !email)
    {
      return res.status(400).json({
        status : "error",
        message : "invalid token"
      });
    }

    // saat email dikirim cek apakah data sesuai dengan di database
    await api.get('/refresh-token', {
      params: {
        refresh_token: refreshToken
      }
    })

    // cek apakah token tersebut valid dan tidak kadaluwarsa
    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) =>{
      if(err)
      {
        return res.status(403).json({
          status: "error",
          message: err.message
        })
      }

      // cek apakah email yang dikirim sama dengan email yang telah di decode di refresh token
      if(email !== decoded.data.email)
      {
        return res.status(400).json({
          status : "error",
          message : "email is not valid"
        }); 
      }

      // membuat token
      const token  = jwt.sign({data : decoded.data}, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});

      // lempar data token ke front end
      return res.json({
        status : "success",
        data: token
      })
    });
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}