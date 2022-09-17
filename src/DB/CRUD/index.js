const { knexMariaDB } = require('../mariadb.js')

const createTableProducts = async () => {
    try {
        const existTable = await knexMariaDB.schema.hasTable('productosuser')
        if (existTable === false) {
            const CreateTable = await knexMariaDB.schema.createTable('productosuser', dataTable => {
                dataTable.increments('id').primary();
                dataTable.string('title');
                dataTable.integer('price');
                dataTable.string('thumbnail');
            })
            console.log('tabla creada')

        } else {
            console.log('La Tabla ya existe')
        }
        // Aca esta a parte para adicionar los objetos
    } catch (e) {
        console.log(e)
    }
}

module.exports = { createTableProducts }
