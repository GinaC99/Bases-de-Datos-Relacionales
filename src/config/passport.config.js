const passport = require('passport')
const local = require('passport-local')
const userServiceSchema = require('./../DB/CRUD/resgisterPeople')
const bcrypt = require('bcrypt')
const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, email, password, done) => {
        try {
            const { name, id } = req.body
            if (!name || !email || !password || !id) return done(null, false);
            const passwordUser = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            const dataExist = dataPrueba.findOne({ email: email })
            const dataPrueba = new userServiceSchema()
            console.log(JSON.stringify(dataExist.exists))
            if (JSON.stringify(dataExist.exists)) {
                console.log('kjkjhsdkja--------------------->>>>>>>')
                return done(null, false);
            }
            return;
            const resultCreateUser = await userServiceSchema.create({
                email,
                name,
                id,
                password: passwordUser,
                role: 'usuario'
            })
            done(null, resultCreateUser)
        } catch (e) {
            console.log(e)
            done(e)
        }


    }))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let result = await userServiceSchema.findOne({ _id: id })
        return done(null, result)
    })
}
module.exports = initializePassport 