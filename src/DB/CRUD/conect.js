const mongoose = require('mongoose')

const main = async () => {
    await mongoose.connect('mongodb+srv://PruebaG:PruebaG@cluster0.vdfyf.mongodb.net/test') // esto pasarlo a variable de entorno
}

main().then(console.log('todo funciona bien'))
    .catch(err => console.log(err, 'esta es el error de conexion de la base de datos'))

module.exports = main; 