const express = require('express');
const router = express.Router();
const knex = require('../db/db');
const moment = require('moment');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

router.post('/user', async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = await knex('users')
                        .insert({ username: req.body.username, password: hash })
                        .returning('*');

        res.json({ success: true, token: encode(user[0])});
    } catch (err) {
        res.status(500).json({ success: false, errorMessage: err });
    }
});

router.post('/login', async (req, res) => {
    try {
        const credentials = {
            username: req.body.username,
            password: req.body.password
        };

        const user = await knex('users').where({ username: credentials.username }).first();
        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
            throw new Error('Incorrect password');
        }

        res.json({ success: true, token: encode(user) });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err });
    }
});

router.get('/user', isAuthenticated, (req, res) => {
    res.json({
        status: 'success',
        user: req.user
    })
});

function encode(user) {
    const token = {
        exp: moment().add(7, 'days').unix(),
        iat: moment().unix(),
        sub: user.id
    };

    return jwt.encode(token, process.env.TOKEN_SECRET);
}

function decode(token, callback) {
    const decodedJwt = jwt.decode(token, process.env.TOKEN_SECRET);
    const now = moment().unix();

    if (now > decodedJwt.exp) {
        callback('Token has expired.');
    } else {
        callback(null, decodedJwt);
    }
}

function isAuthenticated(req, res, next) {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(401).json({ errorMessage: 'Unauthorized'} );
    }

    const token = req.headers.authorization;
    decode(token, async (err, payload) => {
        try {
            if (err) {
                return res.status(401).json({ errorMessage: 'Token expired'} );
            }

            const user = await knex('users').where({ id: parseInt(payload.sub, 10) }).first()
            req.user = user.id;
            return next();
        } catch (err) {
            res.status(500).json({ errorMessage: err });
        }
    })
}

module.exports = router;