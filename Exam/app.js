window.addEventListener('load', solve);

function solve() {
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const peopleCount = document.getElementById('people-count');
    const fromDate = document.getElementById('from-date');
    const daysCount = document.getElementById('days-count');

    const ticketInfoList = document.querySelector('.ticket-info-list');

    const confirmTicket = document.querySelector('.confirm-ticket');

    const nextBtn = document.getElementById("next-btn")

    nextBtn.addEventListener('click', onNext);
    function onNext(e) {
        e.preventDefault();
        if (
            firstName.value == ''
            || lastName.value == ''
            || peopleCount.value == ''
            || fromDate.value == ''
            || daysCount.value == ''
        ) { return; }

        const liElementInfo = createElement('li', 'ticket', undefined, undefined);

        const article = createElement('article', undefined, undefined, undefined);

        createElement('h3', undefined, `Name: ${firstName.value} ${lastName.value}`, article);
        createElement('p', undefined, `From date: ${fromDate.value}`, article);
        createElement('p', undefined, `For ${daysCount.value} days`, article);
        createElement('p', undefined, `For ${daysCount.value} people`, article);

        const editBtn = createElement('button', 'edit-btn', 'Edit', undefined);
        const continueBtn = createElement('button', 'continue-btn', 'Continue', undefined);

        liElementInfo.appendChild(article);
        liElementInfo.appendChild(editBtn);
        liElementInfo.appendChild(continueBtn);

        ticketInfoList.appendChild(liElementInfo);


        nextBtn.disabled = true;

        const editfirstName = firstName.value;
        const editlastName = lastName.value;
        const editpeopleCount = peopleCount.value;
        const editfromDate = fromDate.value;
        const editdaysCount = daysCount.value;

        clearInput()


        editBtn.addEventListener('click', onEdit);
        function onEdit() {
            firstName.value = editfirstName
            lastName.value = editlastName
            peopleCount.value = editpeopleCount
            fromDate.value = editfromDate
            daysCount.value = editdaysCount

            nextBtn.disabled = false;


            liElementInfo.remove()
        }

        continueBtn.addEventListener('click', onContinue);
        function onContinue() {
            const confirmBtn = createElement('button', 'confirm-btn', 'Confirm', undefined);
            const cancelBtn = createElement('button', 'cancel-btn', 'Cancel', undefined);

            editBtn.remove();
            continueBtn.remove();

            liElementInfo.appendChild(confirmBtn);
            liElementInfo.appendChild(cancelBtn);
            liElementInfo.className = 'ticket-content'

            confirmTicket.appendChild(liElementInfo);

            confirmBtn.addEventListener('click', onConfirm);
            

            cancelBtn.addEventListener('click', onCancel);
            function onCancel() {
                liElementInfo.remove()
                nextBtn.disabled = false;

            }
        }
    }

    function onConfirm() {
        const main = document.getElementById("main");
        main.remove()
        const bodi = document.getElementById("body");

        const h1 = createElement('h1', undefined, 'Thank you, have a nice day!', undefined);
        const backBtn = createElement('button', undefined, 'Back', undefined);

        h1.setAttribute('id', 'thank-you');
        backBtn.setAttribute('id', 'back-btn');

        bodi.appendChild(h1);
        bodi.appendChild(backBtn);

        backBtn.addEventListener('click', onReload)
        function onReload() {
            location.reload()            
        }
    }

    

    function createElement(type, classType, text, parent) {
        let element = document.createElement(type);
        if (classType != undefined) {
            element.className = classType;
        }
        if (text != undefined) {
            element.textContent = text;
        }
        if (parent != undefined) {
            parent.appendChild(element);
            return;
        }
        return element;
    }

    function clearInput() {
        firstName.value = ''
        lastName.value = ''
        peopleCount.value = ''
        fromDate.value = ''
        daysCount.value = ''
    }

}




