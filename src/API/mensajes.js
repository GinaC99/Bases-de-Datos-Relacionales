const Msg = require('./../DB/CRUD/MsgSchema')
const main = require('../DB/CRUD/conect')
main()
class mensaje {

    async mensaje({ author, text }) {
        try {
            if ({ author, text }) {
                const data = { author, text }
                const dataSave = new Msg(data)
                dataSave.save()
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