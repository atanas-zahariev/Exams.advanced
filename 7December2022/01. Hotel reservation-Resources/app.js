window.addEventListener('load', solve);

function solve() {
    const nextBtn = document.getElementById("next-btn")
    nextBtn.addEventListener('click', nextPushed)
    let valueArr = []
    function nextPushed(e) {
        e.preventDefault();
        let firstName = document.getElementById("first-name");
        valueArr.push(firstName.value)
        let lastName = document.getElementById("last-name");
        valueArr.push(lastName.value)
        let checkIn = document.getElementById("date-in");
        valueArr.push(checkIn.value)
        let checkOut = document.getElementById("date-out");
        valueArr.push(checkOut.value)
        let numGuest = document.getElementById("people-count");
        valueArr.push(numGuest.value)
        let regexpForNames = /^(?![^A-Za-z]+)([A-z][a-z]+)$/

        if (regexpForNames.test(firstName.value) && regexpForNames.test(lastName.value)
            && checkIn.value !== '' && checkOut.value !== '' && checkOut.value > checkIn.value && numGuest.value !== '') {
            let parent = document.querySelector("#info-reservations > div > div > ul");
            let li = document.createElement('li');
            li.className = "reservation-content"
            let article = document.createElement('article')
            let h3 = document.createElement('h3')
            h3.textContent = `Name: ${firstName.value} ${lastName.value}`
            let nameParagraf = document.createElement('p')
            nameParagraf.textContent = `From date: ${checkIn.value.split('.').reverse().join('-')}`
            let dateParagraf = document.createElement('p')
            dateParagraf.textContent = `To date: ${checkOut.value.split('.').reverse().join('-')}`
            let guestParagraf = document.createElement('p')
            guestParagraf.textContent = `For ${numGuest.value} people`
            article.appendChild(h3)
            article.appendChild(nameParagraf)
            article.appendChild(dateParagraf)
            article.appendChild(guestParagraf)
            let editBtn = document.createElement('button')
            editBtn.className = "edit-btn"
            editBtn.textContent = 'Edit'
            let continueBtn = document.createElement('button')
            continueBtn.className = "continue-btn"
            continueBtn.textContent = 'Continue'
            li.appendChild(article)
            li.appendChild(editBtn)
            li.appendChild(continueBtn)
            parent.appendChild(li);
            firstName.value = '';
            lastName.value = '';
            checkIn.value = '';
            checkOut.value = '';
            numGuest.value = '';
            // let input = Array.from(document.querySelector("#append-reservation > div > div > form"));
            // for(let i = 0; i < input.length - 1; i++){
            //     input[i].value = ''};
            nextBtn.setAttribute('disabled','disabled')
            editBtn.addEventListener('click', isEdit)
            continueBtn.addEventListener('click',isContinue)
            function isEdit(){
                firstName.value = valueArr[0]
                lastName.value = valueArr[1]
                checkIn.value = valueArr[2]
                checkOut.value = valueArr[3]
                numGuest.value = valueArr[4]
                let parent = document.querySelector("#info-reservations > div > div > ul");
                parent.innerHTML = ''
                nextBtn.removeAttribute('disabled')
            }
            function isContinue(){
                editBtn.remove();
                continueBtn.remove()
                let confirmBtn = document.createElement('button');
                confirmBtn.className = "confirm-btn";
                confirmBtn.textContent = "Confirm";
                let cancelBtn = document.createElement('button');
                cancelBtn.className = "cancel-btn";
                cancelBtn.textContent = 'Cancel'
                confirmBtn.addEventListener('click',isConfirm)
                cancelBtn.addEventListener('click',isCanceled)
                li.appendChild(confirmBtn);
                li.appendChild(cancelBtn)
                document.querySelector("#confirm-reservations > div > div > ul").appendChild(li);
            }
        } 
        function isConfirm(){
            document.querySelector("#confirm-reservations > div > div > ul").innerHTML = ''
            nextBtn.removeAttribute('disabled')
            document.querySelector("#verification").classList.add("reservation-confirmed") 
            document.querySelector("#verification").textContent = "Confirmed."   
        }
        function isCanceled(){
            document.querySelector("#confirm-reservations > div > div > ul").innerHTML = '' 
            nextBtn.removeAttribute('disabled')
            document.querySelector("#verification").classList.add("reservation-cancelled")
            document.querySelector("#verification").textContent = "Cancelled."   
        }
    }
}





