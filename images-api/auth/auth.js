const request = require('request-promise');

let isAuthenticated = async (req, res, next) => {
    try {
        if (!(req.headers && req.headers.authorization)) {
            return res.status(401).json({ errorMessage: 'Unauthorized' });
        }

        const options = {
            method: 'GET',
            uri: 'http://users-api:3000/users/user',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization.split(' ')[1]
            }
        }

        let response = await request(options);
        response = JSON.parse(response);
        req.user = response.user;

        return next();

    } catch (err) {
        return next(err);
    }
};

module.exports = {
    isAuthenticated: isAuthenticated
};