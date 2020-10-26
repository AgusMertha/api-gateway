const express = require('express');
const router = express.Router();

const mediaHandler = require('./handler/media');

router.get('/', mediaHandler.getAll);
router.post('/', mediaHandler.create);
router.delete('/:id', mediaHandler.destroy);

module.exports = router;
