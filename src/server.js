const mensaje = require('./API/mensajes')
const express = require('express');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Mensajes = new mensaje()
const cookiesParser = require('cookie-parser')
const session = require('express-session')
// const userActions = require('./API/registerPeople')
// const user = new userActions()
const MongoStore = require('connect-mongo')
const productos = require('./API/products')
const product = new productos()
const passport = require('passport')
const initializePassport = require('./config/passport.config.js')

const app = express();
const httpServer = new HTTPServer(app)
app.use(cookiesParser('PalabraSecreta'))
app.use(session({
    secret: 'SecretoPrueba',
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://PruebaG:PruebaG@cluster0.vdfyf.mongodb.net/test',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 360
    }),
    resave: false,
    saveUninitialized: false
}))
const io = new IOServer(httpServer);
const PORT = 8080;
app.use(express.json());

app.use(express.static('public'));

initializePassport()
app.use(passport.initialize());
app.use(passport.session());

httpServer.listen(PORT, () => {
    console.log('Hey el server esta funcionando en el puerto ', PORT)
})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/registerFail' }), async (req, res) => {
    console.log('incoming request in register')
    console.log(req.user)

    // req.session.user = {
    //     email,
    //     name,
    // }
    // res.status(200).send({ nameUser: name })
})

app.get('/registerFail', async () => {
    res.redirect('failLogs')
})


app.post('/login', async (req, res) => {
    console.log('incoming request in login')
    const { email, password } = req.body
    try {
        const reponseDataUser = await user.login(password, email)
        if (!reponseDataUser) return res.status(400).send({ data: 'Contraseña erronea' })
        const { role, name } = reponseDataUser
        if (reponseDataUser) req.session.user = {
            email,
            role,
            name,
        }
        res.status(200).send({ nameUser: name })
    } catch (e) {
        console.log(e)
        return res.redirect('failLogs')
    }

})

app.get('/logOut', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ error: err })
        res.send("Logged out")
    })
})

app.get('/current', (req, res) => {
    console.log(req.session.user)
    if (!req.session.user) {
        console.log('hey')
        return res.redirect('/')
    }
    return res.status(200).send({ existSessionUser: true })
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
    socket.emit('showProducts', await product.getAll())

    socket.on('newProduct', async (objectProducts) => {
        await product.save(objectProducts)
    })

})