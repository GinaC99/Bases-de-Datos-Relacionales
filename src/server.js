// const Contenedor = require('./API/productos.js')
const mensaje = require('./API/mensajes')
const express = require('express');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
// const Producto = new Contenedor();
const Mensajes = new mensaje()
const FakerData = require('./API/productos-test')
const newFakerata = new FakerData
const cookiesParser = require('cookie-parser')

const app = express();
const httpServer = new HTTPServer(app)
app.use(cookiesParser())
const io = new IOServer(httpServer);
const PORT = 8080;


app.use(express.static('public'));

httpServer.listen(PORT, () => {
    console.log('Hey el server esta funcionando en el puerto ', PORT)
})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/login', (req, res) => {
    console.log('esa aca')
    // const name = 
    // res.cookie('nameUser', name).send()
})




io.on('connection', async (socket) => {
    console.log(`Cliente listo y conectado`)

    //todos los mensajes con el socket
    socket.emit('mensajes', await Mensajes.allMessages())

    socket.on('newMsg', async ({ author, text, }) => {
        const mensajeAll = {
            author,
            text
        }
        const data = await Mensajes.mensaje(mensajeAll)
        console.log(data)
        socket.emit('mensajes', await Mensajes.allMessages())
    })
    socket.on('newProduct', async (objectProducts) => {
        await Producto.save(objectProducts)
    })
    // socket.emit('showProducts', await Producto.getAll())
    // socket.emit('Tabla', await newFakerata.GenData())
})