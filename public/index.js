const socket = io();

const documento = document;

(function () {
    const user = window.localStorage.getItem('nameUser')
    if (user) {
        const htmluser = document.getElementById('userName')
        const htmlData = document.createElement('h1')
        htmlData.innerHTML += `${user}`;
        htmluser.appendChild(htmlData);
    }
})();

const logOut = () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch('/logOut', options)
        .then(responseData => {
            const name = window.localStorage.getItem('nameUser')
            alert(`Hasta luego ${name}`)
            window.localStorage.clear()
            window.location.href = './index.html'
        })
        .catch(e => console.log(e))
}


const CreatedNewProduct = () => {
    const title = document.getElementById('value__tittle').value
    const thumbnail = document.getElementById('value__thumbnail').value
    const price = document.getElementById('value__price').value
    const ObjetoProduct = {}
    ObjetoProduct.title = title;
    ObjetoProduct.thumbnail = thumbnail;
    ObjetoProduct.price = price;
    socket.emit('newProduct', ObjetoProduct)
}


socket.on('showProducts', (responseBack) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch('/current', options)
        .then(responseData => {
            return responseData.json()
        }).then(data => {
            const { existSessionUser } = data
            console.log(existSessionUser)
            if (existSessionUser === true) {
                return responseBack.map((responsedata) => {
                    const showviews = document.createElement('div')
                    Object.keys(responsedata).map((nameTitles => {
                        showviews.innerHTML += `${nameTitles}: ${responsedata[nameTitles]}` + '<br/>'
                        document.getElementById("productos").appendChild(showviews)
                    }))

                })
            }
        }).catch(e => {
            window.location.href = './index.html'
        })

})

socket.on('mensajes', (responseBack) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch('/current', options)
        .then(responseData => {
            return responseData.json()
        }).then(data => {
            const { existSessionUser } = data
            if (existSessionUser === true) {
                return responseBack.map((responsedata) => {
                    const showviews = document.createElement('div')
                    Object.keys(responsedata).map((nameTitles => {
                        showviews.innerHTML += `${nameTitles}: ${JSON.stringify(responsedata[(nameTitles)])}` + '<br/>'
                        document.getElementById("Mensajes").appendChild(showviews)
                    }))

                })
            }
        }).catch(e => {
            window.location.href = './index.html'
        })
})

const enviarMensaje = () => { // cambiar esto
    const nombre = document.getElementById('nombreUser').value
    const id = document.getElementById('correo').value
    const apellido = document.getElementById('lastNameUser').value
    const mensaje = document.getElementById('mensaje').value
    const edad = document.getElementById('ageUser').value
    const alias = document.getElementById('nickNameUser').value
    const avatar = document.getElementById('avatarUser').value

    socket.emit('newMsg', {
        author: {
            nombre,
            apellido,
            id,
            edad,
            alias,
            avatar
        },
        text: mensaje,
    })
}

socket.on('Tabla', (responseDataFaker) => {
    const codHTML = document.createElement("table");
    codHTML.innerHTML += "<tr>"
    Object.keys(responseDataFaker).map((nameTItles) => {
        codHTML.innerHTML += `<th> ${nameTItles} </th> `
    })
    codHTML.innerHTML += "</tr>"
    codHTML.innerHTML += "<tbody>"
    for (let i = 0; i <= 4; i++) {
        codHTML.innerHTML += "<tr>"
        Object.keys(responseDataFaker).map((resonseData) => { // Columnas
            if (resonseData === 'Imagen') {
                codHTML.innerHTML += `<img src=${responseDataFaker[resonseData][i]} />` + '   '
            } else {
                codHTML.innerHTML += `${responseDataFaker[resonseData][i]}` + '   '

            }
        })
        codHTML.innerHTML += "</tr>"
    }
    codHTML.innerHTML += "</tbody></table>"
    document.getElementById('tabla').appendChild(codHTML);
})
