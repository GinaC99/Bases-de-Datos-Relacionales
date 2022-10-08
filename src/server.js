const mensaje = require('./API/mensajes')
const express = require('express');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Mensajes = new mensaje()
const cookiesParser = require('cookie-parser')
const session = require('express-session')
const userActions = require('./API/registerPeople')
const user = new userActions()
const MongoStore = require('connect-mongo')

const app = express();
const httpServer = new HTTPServer(app)
app.use(cookiesParser('PalabraSecreta'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://PruebaG:PruebaG@cluster0.vdfyf.mongodb.net/test',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 3600
    }),
    secret: 'SecetoPrueba',
    resave: true,
    saveUninitialized: true
}))
const io = new IOServer(httpServer);
const PORT = 8080;
app.use(express.json());

app.use(express.static('public'));

httpServer.listen(PORT, () => {
    console.log('Hey el server esta funcionando en el puerto ', PORT)
})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/register', async (req, res) => {
    console.log('incoming request in register')
    const { name, id, email, password } = req.body
    const dataSend = {
        name, id, email, password,
        role: 'user'
    }
    const response = await user.register(dataSend)
    req.session.user = {
        email,
        name,
    }
    res.status(200).send({ nameUser: name })
})

app.post('/login', async (req, res) => {
    console.log('incoming request in login')
    const { email, password } = req.body
    try {
        const reponseDataUser = await user.login(password, email)
        const { role, name } = reponseDataUser
        if (reponseDataUser) req.session.user = {
            email,
            role,
            name,
        }
        res.status(200).send({ nameUser: name })
    } catch (e) {
        console.log(e)
        return res.status(500).send('Estamos presentando Problemas tecnicos')
    }

})

app.get('/logOut', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ error: err })
        res.send("Logged out")
    })
})

app.get('/current', (req, res) => {
    res.status(200).send(req.session.user)
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

})