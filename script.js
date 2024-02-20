
document.querySelector('.add__student').addEventListener('click', () => {
    document.querySelector('.adding__page').style.display = 'flex'
})




document.querySelector('.confirm__adding').addEventListener('click', () => {
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
    <th class="table__content options">
        <button class="options__edit">
            <img src="./img/pencil.svg">
        </button>
        <button class="options__delete">
            <img src="./img/cross.png">
        </button>
        <button class="options__hide-showe">
            !
        </button>
    </th>`
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
        document.querySelector('.adding__page').style.display = 'flex'
        const confirmButton = document.querySelector('.confirm__edit');
        group.value = tr.querySelector('.table__group').textContent
        firstName.value = tr.querySelector('.table__name').textContent.split(' ')[0]
        lastName.value = tr.querySelector('.table__name').textContent.split(' ')[1]
        gender.value = tr.querySelector('.table__gender').textContent
        birthday.value = tr.querySelector('.table__birthday').textContent
        function clickEvent() {
            tr.querySelector('.table__group').textContent = group.value
            tr.querySelector('.table__name').textContent = firstName.value + " " + lastName.value
            tr.querySelector('.table__gender').textContent = gender.value
            tr.querySelector('.table__birthday').textContent = birthday.value
            document.querySelector('.adding__page').style.display = 'none'
            confirmButton.removeEventListener('click', clickEvent);
        }
        confirmButton.addEventListener('click', clickEvent);
    })






    //активація всіх чекбоксів
    const checkboxes = document.querySelectorAll('.checkbox')
    checkboxes[0].addEventListener('change', () => {
        console.log(checkboxes[0].checked)
        checkboxes.forEach(element => {
            element.checked = checkboxes[0].checked;
        })
    })
    document.querySelector('.adding__page').style.display = 'none'



    {
        document.querySelectorAll('.table__rows').forEach(item => {
            item.querySelector('.options__hide-showe').addEventListener('click', event => {
                event.stopPropagation(); // Зупиняємо подальше розповсюдження події, щоб не викликати document.addEventListener
                item.querySelector('.options__edit').style.display = 'block';
                item.querySelector('.options__delete').style.display = 'block';
                document.addEventListener('click', event => {
                    const target = event.target;
                    if (!target.closest('.options__edit') && !target.closest('.options__delete')) {
                        document.querySelectorAll('.options__edit, .options__delete').forEach(button => {
                            button.style.display = 'none';
                        });
                    }
                });
            });
        });

    }
})





if (window.innerWidth <= 650) {
    const gender = document.querySelector('.table__title-gender')
    gender.textContent = 'G'
    const status = document.querySelector('.table__title-status')
    status.textContent = 'S'
    const options = document.querySelector('.table__title-options')
    options.textContent = '...'


} 
