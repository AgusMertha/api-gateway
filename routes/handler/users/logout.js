// digunakan untuk mengirim data yang akan diinsert di api /media
const apiAdapter = require('../../apiAdapter');
const {
  URL_SERVICE_USER
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const id = req.user.data.id;

    const users = await api.post(`/users/logout`, {user_id : id});
    return res.json(users.data);
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}