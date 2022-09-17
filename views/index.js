const socket = io.connect();

socket.on('Productos', (menssBack) => {
    const sendMesHTML = menssBack
        .map(mesjs => `Title: ${mesjs.title} Price: ${mesjs.price} thumbnail:${mesjs.thumbnail}`)
        .join('<br>')
    document.querySelector('p').innerHTML = sendMesHTML
})