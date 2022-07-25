const fs = require('fs')
const { createTableProducts } = require('./../DB/mariadb')
const { knexMariaDB } = require('./../DB/mariadb')

class Contenedor {
    async save(objectoProductos) {
        await createTableProducts
        const InsertData = await knexMariaDB('productosuser').insert(objectoProductos)
    }

    async getById(id) {
        try {
            const searchId = await knexMariaDB.from('productosuser').select('*').where('id', '=', id)
            return (searchId)
        } catch (e) {
            console.log('algo salio mal', e)
        }
    }
    async updateById(id, objetoUpdate) {
        try {
            const update = await knexMariaDB('productosuser').where({ id: id }).update(objetoUpdate)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll() {
        try {
            const allProducts = await knexMariaDB.from('productosuser').select('*')
            return allProducts
        } catch (e) {
            return ('Opps', e)
        }
    }
    async deleteById(id) {
        try {
            const deleteId = await knexMariaDB('productosuser').where({ id: id }).del()
        } catch (e) {
            console.log(e)
        }
    }
    async deleteAll(){
        const deleteAll = await knexMariaDB('productosuser').del()
    }
};

module.exports = Contenedor