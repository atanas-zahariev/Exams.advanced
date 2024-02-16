function solve() {
    const firstName = document.getElementById("fname");
    const lastName = document.getElementById("lname");
    const email = document.getElementById("email");
    const birthDate = document.getElementById('birth');
    const position = document.getElementById("position");
    const salary = document.getElementById("salary");

    const setWorker = document.getElementById("tbody");
    const message = document.getElementById('sum');

    let currentSalary = Number(message.textContent);
    
    document.getElementById("add-worker").addEventListener('click', addWorker)
    function addWorker(e) {
        e.preventDefault();
        if (
            firstName.value == ''
            || lastName.value == ''
            || email.value == ''
            || birthDate.value == ''
            || position.value == ''
            || salary.value == ''
        ) {
            return;
        }

        let trElementInfo = createElement('tr', undefined, undefined);

        let firstNameTd = createElement('td', undefined, firstName.value);
        let lastNameTd = createElement('td', undefined, lastName.value);
        let emailTd = createElement('td', undefined, email.value);
        let birthDateTd = createElement('td', undefined, birthDate.value);
        let positionTd = createElement('td', undefined, position.value);
        let salaryTd = createElement('td', undefined, salary.value);

        let tdForBtns = createElement('td', undefined, undefined)

        let btnFired = createElement('button', 'fired', 'Fired');
        let editBtn = createElement('button', 'edit', 'Edit');

        tdForBtns.appendChild(btnFired);
        tdForBtns.appendChild(editBtn);

        trElementInfo.appendChild(firstNameTd);
        trElementInfo.appendChild(lastNameTd);
        trElementInfo.appendChild(emailTd);
        trElementInfo.appendChild(birthDateTd);
        trElementInfo.appendChild(positionTd);
        trElementInfo.appendChild(salaryTd);
        trElementInfo.appendChild(tdForBtns);

        setWorker.appendChild(trElementInfo);
        
        currentSalary += Number(salary.value)
        message.textContent = (currentSalary).toFixed(2);

        let editFirstName = firstName.value;
        let editLastName = lastName.value;
        let editEmail = email.value;
        let editBirthDate = birthDate.value;
        let editPosition = position.value;
        let editSalary = salary.value;

        firstName.value = ''
        lastName.value = ''
        email.value = ''
        birthDate.value = ''
        position.value = ''
        salary.value = ''

        editBtn.addEventListener('click', onEdit)
        function onEdit() {
            trElementInfo.remove();

            firstName.value = editFirstName;
            lastName.value = editLastName;
            email.value = editEmail;
            birthDate.value = editBirthDate;
            position.value = editPosition;
            salary.value = editSalary;
            
            currentSalary -= Number(editSalary);
            message.textContent = `${currentSalary.toFixed(2)}`
        }

        btnFired.addEventListener('click',onFired)
        function onFired(e){
            let main = e.target.parentElement.parentElement;
            let firedSalary = main.children[5].textContent;
            console.log(firedSalary);
            console.log(currentSalary);
            
            main.remove();
            currentSalary -= Number(firedSalary);
            console.log(currentSalary);
            message.textContent = `${(currentSalary).toFixed(2)}`;            
        }

    }
    function createElement(type, classType, text) {
        let element = document.createElement(type);
        if (classType !== undefined) {
            element.className = classType;
        }
        if (text !== undefined) {
            element.textContent = text;
        }

        return element;
    }
}
solve()