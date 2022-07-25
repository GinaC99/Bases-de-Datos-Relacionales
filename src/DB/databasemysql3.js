const knexSqLite = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './SQLITE3/mensajes.sqlite'
    },
    useNullAsDefault: true
})

module.exports = { knexSqLite }