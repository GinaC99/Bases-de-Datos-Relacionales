const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MsgNameCollections = 'Mensajes'
const MsgSchema = new Schema({
    author: {
        id: { type: String, require: true },
        nombre: { type: String, require: true },
        apellido: { type: String, require: true },
        edad: { type: Number, require: true },
        alias: { type: String, require: true },
        avatar: { type: String, require: true },
    },
    text: { type: String, require: true }

})
const Msg = mongoose.model(MsgNameCollections, MsgSchema)
module.exports = Msg;