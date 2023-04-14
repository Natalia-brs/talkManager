const BAD_REQUEST = 400;

const validateRate = (req, res, next) => {
    const { rate } = req.body.talk;
    if (![1, 2, 3, 4, 5].includes(rate)) {
        return res.status(BAD_REQUEST)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

module.exports = validateRate;

// !Number.isInteger(rate) || (rate < 1 || rate > 5)