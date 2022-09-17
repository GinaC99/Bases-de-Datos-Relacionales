const Msg = require('./../DB/CRUD/NOSQL/MsgSchema')
const mongoose = require('mongoose')
const { normalize, schema } = require('normalizr');
const main = require('./../DB/CRUD/NOSQL/conect')
main()
class mensaje {

    async mensaje({ author, text }) {
        try {
            if ({ author, text }) {
                const data = { author, text }
                const authosMsg = new schema.Entity('author', {
                    author: author,
                    text: text
                })
                const noralizedObject = normalize(data, authosMsg)
                console.log(JSON.stringify(noralizedObject))
                const dataSave = new Msg(data)
                dataSave.save()
                return JSON.stringify(noralizedObject, null, '\t')
            }
        } catch (e) {
            console.log(e)
        }
    }
    async allMessages() {
        const viewAllMens = await Msg.find({})
        return viewAllMens
    }
};

module.exports = mensaje