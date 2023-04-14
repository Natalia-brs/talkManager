const BAD_REQUEST = 400;

const validateAge = (req, res, next) => {
   const { age } = req.body;
   if (age === undefined) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
   }
   
   if (!Number.isInteger(age) || age <= 18) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
   }
   next();
};

module.exports = validateAge;