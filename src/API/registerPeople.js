const userRegister = require('../DB/CRUD/resgisterPeople')
const main = require('../DB/CRUD/conect')
const schemaRegister = require('../DB/CRUD/resgisterPeople')

main()
class userActions {
    async register(objectData) {
        const userSchemaData = new schemaRegister(objectData)
        const nameUser = {}
        const { email } = objectData
        await userSchemaData.save().then(responsedata => {
            const { name } = responsedata
            nameUser.name = name
            return name
        }).catch(e => console.log(e))
        return nameUser
    }

    async login(passwordUser, emailUser) {
        const dataDB = await userRegister.find({ email: emailUser })
        if (!dataDB) return;
        const [dataCompare] = dataDB
        const { name, password, role } = dataCompare
        if (passwordUser === password) return { name, role }
        return;
    }

}

module.exports = userActions