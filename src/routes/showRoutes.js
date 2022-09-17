const express = require('express')
const Contenedor = require('../API/productos.js')
const mensajes = require('./../API/mensajes')
const Products = express();
const ApiProducts = new Contenedor()
const ApiMensajes = new mensajes()

Products.get('/', async (req, res) => {
    console.log('Hey esta en el get')
    const answerData = await ApiProducts.getAll();
    answerData ? res.render('productos', answerData) : res.send({ error: 'noProducts' })
})

Products.post('/', (req, res) => {
    console.log('Esta en el post')
    const Objeto = req.body
    ApiProducts.save(Objeto);
    res.redirect('/');
})

Products.post('/messag', async (req, res) => {
    console.log('Esta en el post de Mensajes')
    const Objeto = req.body
    Objeto.date = new Date()
    await ApiMensajes.mensaje(Objeto);
    const data = await ApiMensajes.allMessages()
    console.log(data)
    // res.redirect('/');
})

module.exports = { Products };
