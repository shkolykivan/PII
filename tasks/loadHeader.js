async function getHeader() {
    const response = await fetch('../header/header.html');
    const data = await response.text()
    document.querySelector('.header').innerHTML = data

}

getHeader();


console.log('Data loaded')
