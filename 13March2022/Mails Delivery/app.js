function solve() {

    const recipientName = document.getElementById('recipientName');
    const title = document.getElementById('title');
    const message = document.getElementById('message');

    const addBtn = document.getElementById('add');
    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', onReset);
    function onReset(e) {
        e.preventDefault()
        recipientName.value = ''
        title.value = ''
        message.value = ''
    }

    const listMails = document.getElementById('list');

    const sentList = document.querySelector('.sent-list');

    const trash = document.querySelector('.delete-list')

    addBtn.addEventListener('click', addMails)
    function addMails(e) {
        e.preventDefault()
        if (
            recipientName.value == ''
            || title.value == ''
            || message.value == ''
        ) { return }

        let liElementInfo = createElement('li', undefined, undefined);

        let titleH4 = createElement('h4', undefined, `Recipient Name: ${recipientName.value}`);
        let recipientH4 = createElement('h4', undefined, `Title: ${title.value}`);
        let spanMessage = createElement('span', undefined, message.value);

        let listActionDiv = createElement('div', [{ attribute: 'id', value: 'list-action' }], undefined);

        let submitBtn = createElement('button', [{ attribute: 'type', value: 'submit' }, { attribute: 'id', value: 'send' }], 'Send');
        let deletBtn = createElement('button', [{ attribute: 'type', value: 'submit' }, { attribute: 'id', value: 'delete' }], 'Delete');
        deletBtn.addEventListener('click', onDelete)

        listActionDiv.appendChild(submitBtn);
        listActionDiv.appendChild(deletBtn);

        liElementInfo.appendChild(recipientH4);
        liElementInfo.appendChild(titleH4);
        liElementInfo.appendChild(spanMessage);
        liElementInfo.appendChild(listActionDiv);

        listMails.appendChild(liElementInfo);

        let onSubmitImeal = title.value;
        let onSubmitTitle = recipientName.value

        recipientName.value = ''
        title.value = ''
        message.value = ''

        submitBtn.addEventListener('click', onSubmit)
        function onSubmit() {

            let liSentLi = createElement('li', undefined, undefined);

            let sentSpanMail = createElement('span', undefined, `To: ${onSubmitImeal} `)
            let sentSpanTitle = createElement('span', undefined, `Title:  ${onSubmitTitle}`);

            let sentDiv = createElement('div', [{ attribute: 'class', value: 'btn' }], undefined)

            let btnDelete = createElement('button', [{ attribute: 'type', value: 'submit' }, { attribute: 'class', value: 'delete' }],'Delete');
            btnDelete.addEventListener('click', onDelete)

            sentDiv.appendChild(btnDelete);

            liSentLi.appendChild(sentSpanMail)
            liSentLi.appendChild(sentSpanTitle)
            liSentLi.appendChild(sentDiv);

            sentList.appendChild(liSentLi)
            liElementInfo.remove()
        }

        function onDelete(e) {
            let main = e.target.parentElement.parentElement;
            main.remove();

            let li = createElement('li',undefined,undefined)

            let spanEmail =createElement('span',undefined,`To: ${onSubmitImeal} `)
            let spanTitle = createElement('span',undefined,`Title:  ${onSubmitTitle}`)

            li.appendChild(spanEmail);
            li.appendChild(spanTitle)

            trash.appendChild(li);
        }
    }
    function createElement(type, arr, text) {
        let element = document.createElement(type)
        if (arr !== undefined) {
            arr.forEach(obj => {
                let { attribute, value } = obj;
                element.setAttribute(attribute, value)
            })
        }
        if (text !== undefined) {
            element.textContent = text;
        }
        return element;
    }
}
solve()