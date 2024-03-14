const students = []


let group = document.querySelector('.group__input')
let firstName = document.querySelector('.fname__input')
let lastName = document.querySelector('.lname__input')
let gender = document.querySelector('.gender__input')
let birthday = document.querySelector('.birthday__input')

function isFormValide(group, firstName, lastName, gender, birthday) {

    // Input validation
    document.querySelectorAll('.form__item').forEach((parent, index) => {
        const input = parent.querySelector('.input')
        if (input.value == '') {
            if (!parent.classList.contains('warning__input')) {
                parent.classList.add('warning__input')
            }
        }
        else if (!(/^[a-zA-Z]+$/.test(input.value)) && (index == 1 || index == 2)) {
            if (!parent.classList.contains('warning__input')) {
                parent.classList.add('warning__input')
            }
        }
        else if (parent.classList.contains('warning__input')) {
            parent.classList.remove('warning__input')
        }
    })
    if (group == '' || firstName == '' || lastName == '' || gender == '' || birthday == '') {
        return false
    }
    if (!(/^[a-zA-Z]+$/.test(firstName))) {
        return false
    }
    if (!(/^[a-zA-Z]+$/.test(lastName))) {
        return false
    }
    return true
}
function clearForm() {
    group.value = ''
    firstName.value = ''
    lastName.value = ''
    gender.value = ''
    birthday.value = ''
}

function makeFormDefoult() {
    document.querySelectorAll('.form__item').forEach(parent => {
        parent.classList.remove('warning__input')
    })
}


document.querySelector('.add__student').addEventListener('click', () => {
    clearForm()


    document.querySelector('.adding__page').style.display = 'flex'

    document.querySelector('.confirm__adding').removeEventListener('click', hideAddingPage)
    document.querySelector('.confirm__adding').addEventListener('click', mainFunction)
    document.querySelector('.confirm__edit').addEventListener('click', hideAddingPage)
    //Зміна заголовка
    document.querySelector('.chaning__title').textContent = 'Add Student'
})

function hideAddingPage() {
    document.querySelector('.adding__page').style.display = 'none'
    makeFormDefoult()
}


function mainFunction() {
    document.querySelector('.confirm__edit').addEventListener('click', hideAddingPage)

    if (isFormValide(
        group.value,
        firstName.value,
        lastName.value,
        gender.value,
        birthday.value)
    ) {
        //додавання студента
        const student = {
            id: students.length + 1,
            group: group.value,
            name: firstName.value + " " + lastName.value,
            gender: gender.value,
            birthday: birthday.value,
        }
        students.push(student)

        //JSON string
        let jsonData = JSON.stringify(student)
        console.log('New student:', jsonData)


        //додавання вузла
        const tr = document.createElement('tr')
        tr.className = 'table__rows'
        tr.dataset.index = students.length - 1
        tr.innerHTML =
            `<td class="table__content table__checkbox">
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
        clearForm()



        //кнопка видалення
        tr.querySelector('.options__delete').addEventListener('click', () => {
            const warningPage = document.querySelector('.warning__page')
            warningPage.style.display = 'flex'
            warningPage.querySelector('.warning__main').textContent = `Are you sure you want to delete ${tr.querySelectorAll('.table__content')[2].textContent}?`
            warningPage.querySelector('.confirm__warning').addEventListener('click', () => {
                tr.remove()
                students[tr.dataset.index] = null
                warningPage.style.display = 'none'
            })
            console.log(tr.querySelectorAll('.table__content'))
        })


        //кнопка редагування
        tr.querySelector('.options__edit').addEventListener('click', () => {
            document.querySelector('.confirm__adding').removeEventListener('click', mainFunction)
            document.querySelector('.confirm__adding').addEventListener('click', hideAddingPage)




            document.querySelector('.adding__page').style.display = 'flex'
            document.querySelector('.chaning__title').textContent = 'Edit Student'

            group.value = tr.querySelector('.table__group').textContent
            firstName.value = tr.querySelector('.table__name').textContent.split(' ')[0]
            lastName.value = tr.querySelector('.table__name').textContent.split(' ')[1]
            gender.value = tr.querySelector('.table__gender').textContent
            birthday.value = tr.querySelector('.table__birthday').textContent

            const confirmButton = document.querySelector('.confirm__edit')
            confirmButton.removeEventListener('click', hideAddingPage)
            if (confirmButton.onclick !== null) {
                confirmButton.removeEventListener('click', clickEvent)
            }
            confirmButton.addEventListener('click', clickEvent)
            function clickEvent() {
                confirmButton.removeEventListener('click', hideAddingPage)
                if (isFormValide(
                    group.value,
                    firstName.value,
                    lastName.value,
                    gender.value,
                    birthday.value)) {
                    tr.querySelector('.table__group').textContent = group.value
                    tr.querySelector('.table__name').textContent = firstName.value + " " + lastName.value
                    tr.querySelector('.table__gender').textContent = gender.value
                    tr.querySelector('.table__birthday').textContent = birthday.value
                    document.querySelector('.adding__page').style.display = 'none'


                    students[+tr.dataset.index] = {
                        id: +tr.dataset.index + 1,
                        group: group.value,
                        name: firstName.value + " " + lastName.value,
                        gender: gender.value,
                        birthday: birthday.value,
                    }
                    let jsonData = JSON.stringify(students[+tr.dataset.index])
                    console.log('Edited student:', jsonData)

                    confirmButton.removeEventListener('click', clickEvent)
                    confirmButton.addEventListener('click', hideAddingPage)
                    makeFormDefoult()
                }
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



}






// Movile-desktop styles
if (window.innerWidth <= 650) {
    const gender = document.querySelector('.table__title-gender')
    gender.textContent = 'G'
    const status = document.querySelector('.table__title-status')
    status.textContent = 'S'
    const options = document.querySelector('.table__title-options')
    options.textContent = '...'
}


