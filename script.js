
document.querySelector('.add__student').addEventListener('click', () => {
    document.querySelector('.group__input').value = ''
    document.querySelector('.fname__input').value = ''
    document.querySelector('.lname__input').value = ''
    document.querySelector('.gender__input').value = ''
    document.querySelector('.birthday__input').value = ''



    document.querySelector('.adding__page').style.display = 'flex'

    document.querySelector('.confirm__adding').removeEventListener('click', f)
    document.querySelector('.confirm__adding').addEventListener('click', mainFunction)

    //Зміна заголовка
    document.querySelector('.chaning__title').textContent = 'Add Student'
})

function f() {
    document.querySelector('.adding__page').style.display = 'none'
}


function mainFunction() {
    let group = document.querySelector('.group__input')
    let firstName = document.querySelector('.fname__input')
    let lastName = document.querySelector('.lname__input')
    let gender = document.querySelector('.gender__input')
    let birthday = document.querySelector('.birthday__input')


    //додавання вузла
    const tr = document.createElement('tr')
    tr.className = 'table__rows'
    tr.innerHTML = `<td class="table__content table__checkbox">
        <input type="checkbox" name="checkbox${document.getElementsByTagName('tr').length + 1}" class="checkbox">
    </td>
    <td class="table__content table__group">${group.value}</td>
    <td class="table__content table__name">${firstName.value + " " + lastName.value}</td>
    <td class="table__content table__gender">${gender.value}</td>
    <td class="table__content table__birthday">${birthday.value}</td>
    <td class="table__content table__status">
        <div class="circle">
        </div>
    </td>
    <td class="table__content options">
        <button class="options__edit">
            <img src="./img/pencil.svg">
        </button>
        <button class="options__delete">
            <img src="./img/cross.png">
        </button>
        <button class="options__hide-showe">
            !
        </button>
    </td>`
    document.querySelector('.table__body').appendChild(tr)


    //кнопка видалення
    tr.querySelector('.options__delete').addEventListener('click', () => {
        const warningPage = document.querySelector('.warning__page')
        warningPage.style.display = 'flex'
        warningPage.querySelector('.warning__main').textContent = `Are you sure you want to delete ${tr.querySelectorAll('.table__content')[2].textContent}?`
        warningPage.querySelector('.confirm__warning').addEventListener('click', () => {
            tr.remove()
            warningPage.style.display = 'none'
        })
        console.log(tr.querySelectorAll('.table__content'))
    })


    //кнопка редагування
    tr.querySelector('.options__edit').addEventListener('click', () => {
        document.querySelector('.confirm__adding').removeEventListener('click', mainFunction)
        document.querySelector('.confirm__adding').addEventListener('click', f)


        document.querySelector('.adding__page').style.display = 'flex'
        document.querySelector('.chaning__title').textContent = 'Edit Student'
        group.value = tr.querySelector('.table__group').textContent
        firstName.value = tr.querySelector('.table__name').textContent.split(' ')[0]
        lastName.value = tr.querySelector('.table__name').textContent.split(' ')[1]
        gender.value = tr.querySelector('.table__gender').textContent
        birthday.value = tr.querySelector('.table__birthday').textContent

        const confirmButton = document.querySelector('.confirm__edit')
        confirmButton.addEventListener('click', clickEvent)
        function clickEvent() {
            tr.querySelector('.table__group').textContent = group.value
            tr.querySelector('.table__name').textContent = firstName.value + " " + lastName.value
            tr.querySelector('.table__gender').textContent = gender.value
            tr.querySelector('.table__birthday').textContent = birthday.value
            document.querySelector('.adding__page').style.display = 'none'
            confirmButton.removeEventListener('click', clickEvent);
        }
    })


    //активація всіх чекбоксів
    const checkboxes = document.querySelectorAll('.checkbox')
    checkboxes[0].addEventListener('change', () => {
        console.log(checkboxes[0].checked)
        checkboxes.forEach(element => {
            element.checked = checkboxes[0].checked;
        })
    })




    //Приховане редагування і видалення
    if (window.innerWidth <= 650) {
        tr.querySelector('.options__hide-showe').addEventListener('click', () => {
            document.querySelectorAll('.table__rows').forEach(item => {
                item.querySelector('.options__edit').style.display = 'none';
                item.querySelector('.options__delete').style.display = 'none';
            })

            tr.querySelector('.options__edit').style.display = 'block';
            tr.querySelector('.options__delete').style.display = 'block';
        })
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.options')) {
                document.querySelectorAll('.table__rows').forEach(item => {
                    item.querySelector('.options__edit').style.display = 'none';
                    item.querySelector('.options__delete').style.display = 'none';
                })
            }
        });
    }
}


if (window.innerWidth <= 650) {
    const gender = document.querySelector('.table__title-gender')
    gender.textContent = 'G'
    const status = document.querySelector('.table__title-status')
    status.textContent = 'S'
    const options = document.querySelector('.table__title-options')
    options.textContent = '...'
}

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
