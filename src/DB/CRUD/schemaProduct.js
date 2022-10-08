const moongose = require('mongoose')
const Schema = moongose.Schema
const nameCollections = 'Productos'
const productSchema = new Schema({
    title: { type: String, require: true },
    price: { type: String, require: true },
    thumbnail: { type: String, required: true }
})

const producto = moongose.model(nameCollections, productSchema)
module.exports = producto