const path = require('path');

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: path.join(__dirname, 'db', 'migrations')
        }
    }
}