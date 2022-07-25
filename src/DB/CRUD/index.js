const { knexSqLite } = require('../databasemysql3')
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

const createMesag = async () => {
    try {
        const exitsTable = await knexSqLite.schema.hasTable('mensajes')
        // console.log(exitsTable)
        if (!exitsTable) {
            const createTable = await knexSqLite.schema.createTable('mensajes', (data) => {
                data.increments().primary();
                data.string('email');
                data.string('mensaje');
            })
            console.log('tabla creada')
        } else {
            console.log('La Tabla ya existe')
        }
    } catch (e) {
        console.log(e)
    }
}


module.exports = { createTableProducts, createMesag }



