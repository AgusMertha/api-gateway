const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const users = await api.post('/users/login', req.body);
    const data = users.data.data;

    // generate token
    const token = jwt.sign({data: data}, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
    const refreshToken = jwt.sign({data: data}, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});

    await api.post('refresh-token', {refresh_token: refreshToken, user_id: data.id});

    // berikan response ke depan agar token dapat digunakan front end
    return res.json({
      status : "success",
      data : {
        token,
        refresh_token : refreshToken
      }
    })

  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}