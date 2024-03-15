const buttons = $('button');

buttons.each(function () {
    $(this).on('click', function () {
        const button = $(this)
        button.addClass("clicked")
        button.text("Select task to add")
        button.addClass("bg-primary")
        button.removeClass("bg-white")
        setTimeout(function () {
            function myfunction(event) {
                console.log(this)
                button.removeClass("clicked")
                button.text("+ Add task")
                button.removeClass("bg-primary")
                button.addClass("bg-white")
                const target = event.target
                if ($(target).hasClass('list-group-item')) {
                    const nodeParent = event.target.parentElement;
                    if ($(button).parent().get(0) !== nodeParent) {
                        $(button).parent().find('.list-group').append($(target).prop('outerHTML'));
                        $(target).remove();
                    }
                }

                $('.list-group').each(function (index, ul) {
                    if ($(ul).children().length === 0) {
                        $('.empty__massage').eq(index).css('display', 'block');
                    } else {
                        $('.empty__massage').eq(index).css('display', 'none');
                    }
                });

                $("body").off('click', myfunction)
            }
            $("body").on('click', myfunction)

        }, 0);
    });
});