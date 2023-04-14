const BAD_REQUEST = 400;

const validateCreatedAt = (req, res, next) => {
    const { watchedAt } = req.body.talk;
    const formatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    
    if (!formatDate.test(watchedAt)) {
        return res.status(BAD_REQUEST)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
}; 

module.exports = validateCreatedAt;