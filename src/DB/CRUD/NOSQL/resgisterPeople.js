const mongoose = require('mongoose')
const Schema = mongoose.Schema
const nameCollection = 'usuarios'
const registerSchema = new Schema({
    email: { type: String, required: true },
    idUser: { type: Number, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
})

const userReg = mongoose.model(nameCollection, registerSchema)
module.exports = userReg;