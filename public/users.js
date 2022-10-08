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
            const { name } = data
            window.localStorage.setItem('nameUser', name)
        })
        .catch(e => console.log(e))
}

const loginUser = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

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
            window.localStorage.setItem('nameUser', nameUser)
        }).then(response => window.location.href = './showProduct.html')
        .catch(e => console.log(e))
}
