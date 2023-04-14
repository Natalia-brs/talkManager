const express = require('express');

const router = express.Router();
const readTalker = require('../utils/readFile');

const STATUS_OK = 200;

router.get('/', async (req, res) => {
   const talkerJSON = await readTalker();
   if (talkerJSON.length < 1) return res.status(STATUS_OK).json([]);
   return res.status(STATUS_OK).json(talkerJSON);
});

module.exports = router;