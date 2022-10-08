const productSchema = require('./../DB/CRUD/schemaProduct')
const main = require('../DB/CRUD/conect')
main()
class Contenedor {
    async save(objectoProductos) {
        try {
            console.log('Incoming request save data')
            const productsSchema = new productSchema(objectoProductos)
            await productsSchema.save()
            return ('Exito')
        } catch (e) {
            console.log(e)
        }

    }

    async getById(id) {
        try {
            console.warn('Reaizacion de busqueda de un producto por Id')
            const IdProducts = await productSchema.find({ _id: id })
            return (IdProducts)
        } catch (e) {
            console.error(e)
        }
    }
    async getAll() {
        try {
            console.warn('Esta en la obtencion de todos los productos')
            const AllData = await productSchema.find({})
            return (AllData)
        } catch (e) {
            console.error(e)
        }
    }
    async deleteById(id) {
        try {
            console.warn('Esta es la eliminacion de un producto por ID')
            const deleteById = await productSchema.deleteOne({ _id: id })
            return (deleteById)
        } catch (e) {
            console.error(e)
        }
    }
    async deleteAll() {
        try {
            console.warn('Esta en la eliminacon de todos los productos')
            const deleteAll = await productSchema.deleteMany({})
            return (deleteAll)
        } catch (e) {
            console.error(e)
        }
    }
};

module.exports = Contenedor
