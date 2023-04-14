const BAD_REQUEST = 400;

const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    if (email === undefined) {
        return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.match(regexEmail)) {
       return res.status(BAD_REQUEST)
       .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

module.exports = validateEmail;