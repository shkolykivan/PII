
document.querySelector('.header__account').addEventListener('click', () => {
    document.querySelector('.modal__account').style.display = 'block'
})
document.addEventListener('click', (event) => {
    if (!event.target.closest('.header__account'))
        document.querySelector('.modal__account').style.display = 'none'
})

document.querySelector('.header__massage').addEventListener('click', () => {
    document.querySelector('.modal__masage').style.display = 'block'
})
document.addEventListener('click', (event) => {
    if (!event.target.closest('.header__massage'))
        document.querySelector('.modal__masage').style.display = 'none'
})
