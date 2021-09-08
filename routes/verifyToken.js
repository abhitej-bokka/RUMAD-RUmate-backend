const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied! No auth token found.');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        res.status(400).send('Access Denied! Invalid token.');

    }

}

// 57:28 / 1:15:40 on video - Build A Node.js API Authentication With JWT Tutorial