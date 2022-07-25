const { knexSqLite } = require('./../DB/databasemysql3')
const { createMesag } = require('./../DB/CRUD/index')


class mensaje {

    async mensaje(Mensaje) {
        try {
            if (createMesag) {
                const insertMensaje = await knexSqLite('mensajes').insert(Mensaje)
            }
        } catch (e) {
            console.log(e)
        }
    }
    async allMessages() {
        const viewAllMens = await knexSqLite.from('mensajes').select('*')
        return viewAllMens
    }
};

module.exports = mensaje