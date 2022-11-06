const userRegister = require('../DB/CRUD/resgisterPeople')
const main = require('../DB/CRUD/conect')
const schemaRegister = require('../DB/CRUD/resgisterPeople')
const bcrypt = require('bcrypt')


// main()
// class userActions {
//     async register(objectData) {
//         const { email, id } = objectData
//         const dataExist = schemaRegister.findOne({ email: email })
//         //     await userSchemaData.save().then(responsedata => {
//         //         const { name } = responsedata
//         //         nameUser.name = name
//         //         nameUser.id = id
//         //         return;
//         //     }).catch(e => console.log(e))
//         //     console.log(nameUser)
//         //     return nameUser
//         // }
//     }

//     async login(passwordUser, emailUser) {
//         const dataDB = await userRegister.find({ email: emailUser })
//         if (!dataDB) return;
//         const [dataCompare] = dataDB
//         const { name, password, role } = dataCompare
//         const isValidPasword = bcrypt.compareSync(passwordUser, password)
//         if (isValidPasword) return { name, role }
//         return isValidPasword
//     }

// }

// module.exports = userActions