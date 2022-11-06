const registerUser = () => {

    const name = document.getElementById('name').value
    const id = document.getElementById('id').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const data = {
        name, id, password, email
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch('/register', options)
        .then(responseData => {
            return responseData.json()
        }).then(data => {
            const { nameUser } = data
            window.localStorage.setItem('nameUser', nameUser)
            window.location.href = './showProduct.html'
        })
        .catch(e => console.log(e))
}

const loginUser = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    let validateData = false
    const data = {
        password, email
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch('/login', options)
        .then(responseData => {
            return responseData.json()
        })
        .then(data => {
            const { nameUser } = data
            if (!nameUser) return alert('contraseña incorrecta')
            validateData = true
            window.localStorage.setItem('nameUser', nameUser)
        }).then(response => { if (validateData) window.location.href = './showProduct.html' })
        .catch(e => console.log(e))
}
