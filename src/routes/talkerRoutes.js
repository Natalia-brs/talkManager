const express = require('express');

const router = express.Router();

const readTalker = require('../utils/readFile');
const write = require('../utils/writeFile');
const auth = require('../middlewares/auth');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateCreatedAt = require('../middlewares/validateCreatedAt');
const validateTalk = require('../middlewares/validateTalk');
const validateRate = require('../middlewares/validateRate');

const STATUS_OK = 200;
const NOT_FOUND = 404;
const CREATED_STATUS = 201;
const NO_CONTENT = 204;
const SERVER_ERROR = 500;

router.get('/', async (_req, res) => {
    try {
        const talkerJSON = await readTalker();
        if (talkerJSON.length < 1) return res.status(STATUS_OK).json([]);
        return res.status(STATUS_OK).json(talkerJSON);
    } catch (error) {
        res.status(SERVER_ERROR).send({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const talkerByID = await readTalker();
        const findById = talkerByID.find((talker) => talker.id === Number(id));
        if (findById) return res.status(STATUS_OK).json(findById);
        return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    } catch (error) {
        res.status(SERVER_ERROR).send({ message: error.message });
    }
});

router.post('/',
  auth,
  validateName,
  validateAge,
  validateTalk,
  validateCreatedAt,
  validateRate,
 async (req, res) => {
    try {
        const read = await readTalker();
        const info = req.body;
        const obj = {
            id: read[read.length - 1].id + 1,
           ...info,
        };
        read.push(obj);
        write(read);
        return res.status(CREATED_STATUS).json(obj);
    } catch (error) {
        res.status(SERVER_ERROR).send({ message: error.message });
    }
});
//
router.put('/:id',
auth,
validateName,
validateAge,
validateTalk,
validateCreatedAt,
validateRate,
async (req, res) => {
 try {
    const { id } = req.params;
    const info = req.body;
    const talker = await readTalker();

    const index = talker.findIndex((element) => element.id === Number(id));
    if (index === -1) {
        return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
    talker[index] = { id: Number(id), ...info };
    write(talker);
    return res.status(STATUS_OK).json(talker[index]);
 } catch (error) {
    res.status(SERVER_ERROR).send({ message: error.message });
 }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const talker = await readTalker();
        const filtered = talker.filter((talk) => talk.id !== Number(id));
        await write(filtered);
        return res.status(NO_CONTENT).end();
    } catch (error) {
        res.status(SERVER_ERROR).send({ message: error.message });
    } 
});

module.exports = router;