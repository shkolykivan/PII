document.addEventListener('click', (event) => {
    document.querySelector('.modal__account').style.display = 'none'
    document.querySelector('.modal__masage').style.display = 'none'

    if (event.target.closest('.header__account')){
        document.querySelector('.modal__account').style.display = 'block'
    }else if(event.target.closest('.header__massage')){
        document.querySelector('.modal__masage').style.display = 'block'
    }
})

