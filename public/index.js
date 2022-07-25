const socket = io();

const CreatedNewProduct = () => {
    const title = document.getElementById('value__tittle').value
    const thumbnail = document.getElementById('value__thumbnail').value
    const price = document.getElementById('value__price').value
    const ObjetoProduct = {}
    ObjetoProduct.title = title;
    ObjetoProduct.thumbnail = thumbnail;
    ObjetoProduct.price = price;
    socket.emit('newProduct')
}

socket.on('showProducts',(responseBack) => {
    responseBack.map((responsedata)=>{
        const showviews = document.createElement('div')
        Object.keys(responsedata).map((nameTitles=>{
            showviews.innerHTML += `${nameTitles}: ${responsedata[nameTitles]}` + '<br/>'
            document.getElementById("productos").appendChild(showviews)
        }))
        
    })
})

socket.on('mensajes', (responseBack) => {
    responseBack.map((responsedata)=>{
        const showviews = document.createElement('div')
        Object.keys(responsedata).map((nameTitles=>{
            showviews.innerHTML += `${nameTitles}: ${responsedata[nameTitles]}` + '<br/>'
            document.getElementById("Mensajes").appendChild(showviews)
        }))
        
    })
})

const enviarMensaje = () => {
    const email = document.getElementById('correo').value
    const mensaje = document.getElementById('mensaje').value

    socket.emit('newMsg', {
        email: email,
        mensaje: mensaje
    })
}

