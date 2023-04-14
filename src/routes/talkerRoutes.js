const express = require('express');

const router = express.Router();

const readTalker = require('../utils/readFile');

const STATUS_OK = 200;
const NOT_FOUND = 404;

router.get('/', async (_req, res) => {
   const talkerJSON = await readTalker();
   if (talkerJSON.length < 1) return res.status(STATUS_OK).json([]);
   return res.status(STATUS_OK).json(talkerJSON);
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const talkerByID = await readTalker();
        const findById = talkerByID.find((talker) => talker.id === Number(id));
        if (findById) return res.status(STATUS_OK).json(findById);
        return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;