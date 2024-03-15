const buttons = document.querySelectorAll('button')

buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('clicked')
        button.textContent = 'Select task to add'
        button.classList.add('bg-primary')
        button.classList.remove('bg-white')
        setTimeout(function () {

            document.querySelector('body').addEventListener(
                'click',
                (event) => {
                    button.classList.remove('clicked')
                    button.textContent = '+ Add task'
                    button.classList.add('bg-white')
                    button.classList.remove('bg-primary')
                    const target = event.target
                    if (target.classList.contains('list-group-item')) {
                        const nodeParent = event.target.parentElement
                        if (button.parentElement !== nodeParent) {
                            button.parentElement.querySelector('.list-group').insertAdjacentHTML('beforeend', target.outerHTML)
                            target.remove()
                        }
                        document.querySelectorAll('.list-group').forEach((ul, index) => {
                            console.log(ul.children.length)
                            if (ul.children.length == 0) {
                                document.querySelectorAll('.empty__massage')[index].style.display = 'block'
                            } else {
                                document.querySelectorAll('.empty__massage')[index].style.display = 'none'
                            }
                        })
                    }
                },
                {
                    "capture": false,
                    "once": true
                }

            )

        }, 0);

    })
})
