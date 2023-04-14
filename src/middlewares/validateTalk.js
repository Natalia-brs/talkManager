const BAD_REQUEST = 400;

const validateTalk = (req, res, next) => {
     const { talk } = req.body;
     
     if (talk === undefined) {
        return res.status(BAD_REQUEST).json({ message: 'O campo "talk" é obrigatório' });
     }

     if (talk.watchedAt === undefined) {
        return res.status(BAD_REQUEST).json({ message: 'O campo "watchedAt" é obrigatório' });
     }

     if (talk.rate === undefined) {
        return res.status(BAD_REQUEST).json({ message: 'O campo "rate" é obrigatório' });
     }
     next();
};

module.exports = validateTalk;