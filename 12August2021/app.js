window.addEventListener('load', solve);

function solve() {
    const model = document.getElementById("model")
    const year = document.getElementById("year")
    const description = document.getElementById("description")
    const price = document.getElementById("price")

    const totalPrice = document.querySelector('.total-price');

    let total = 0

    const furnitureList = document.getElementById("furniture-list")

    document.getElementById("add").addEventListener('click', addFurniture)
    function addFurniture(e) {
        e.preventDefault();

        if (
            model.value == ''
            || year.value == ''
            || year.value < 0
            || description.value == ''
            || price.value == ''
            || price < 0
        ) { return }

        const infoTr = createElement('tr', 'info', undefined, undefined);

        createElement('td', undefined, model.value, infoTr)
        createElement('td', undefined, `${Number(price.value).toFixed(2)}`, infoTr);

        total += Number(price.value)

        const buttonsTd = createElement('td', undefined, undefined, undefined);

        const moreInfoBtn = createElement('button', 'moreBtn', 'More Info', undefined);
        const buyBtn = createElement('button', 'buyBtn', 'Buy it', undefined);

        buttonsTd.appendChild(moreInfoBtn)
        buttonsTd.appendChild(buyBtn);

        infoTr.appendChild(buttonsTd);

        const hideTr = createElement('tr', 'hide', undefined, undefined);

        createElement('td', undefined, `Year: ${year.value}`, hideTr);

        const tdColspan = createElement('td', undefined, `Description: ${description.value}`, undefined);
        tdColspan.setAttribute('colspan', '3');

        hideTr.appendChild(tdColspan);

        furnitureList.appendChild(infoTr);
        furnitureList.appendChild(hideTr);

        clearInput();

        let togle = 0;
        moreInfoBtn.addEventListener('click', displayInfo);
        function displayInfo() {
            if (togle == 0) {
                moreInfoBtn.textContent = 'Less Info'
                hideTr.setAttribute('style', 'display: contents;')
                togle++
            } else {
                moreInfoBtn.textContent = 'More Info'
                hideTr.style.display = 'none';
                togle--
            }
        }

        buyBtn.addEventListener('click', onBuy)
        function onBuy(e) {            
            totalPrice.textContent = total.toFixed(2);
            furnitureList.removeChild(infoTr);
            furnitureList.removeChild(hideTr);
        }
    }

    function clearInput() {
        model.value = ''
        year.value = ''
        description.value = ''
        price.value = ''
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
}
