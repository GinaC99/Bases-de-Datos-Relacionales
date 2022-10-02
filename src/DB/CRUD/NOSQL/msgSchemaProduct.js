const moongose = require('mongoose')
const Schema = moongose.Schema
const nameCollections = 'Productos'
const productSchema = new Schema({
    nombreProducto: { type: String, require: true },
    precio: { type: String, require: true },
    imagen: { type: String, required: true }
})

const producto = moongose.model(nameCollections, productSchema)
module.exports = producto