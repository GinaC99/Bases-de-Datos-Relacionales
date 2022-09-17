const faker = require('faker')
faker.locale = 'es';
const { commerce, image } = faker

class FakerData {
    async GenData() {
        const dataProducts = ["NombreProducto", "Precio", "Imagen"]
        const data = {}
        dataProducts.map((responeName) => {
            data[responeName] = []
        })
        for (let i = 0; i < 5; i++) {
            data['NombreProducto'].push(commerce.productName())
            data['Precio'].push(commerce.price())
            data['Imagen'].push(image.imageUrl())
        }
        return (data)
    }
}

module.exports = FakerData;