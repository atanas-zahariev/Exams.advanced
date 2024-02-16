window.addEventListener('load', solve);

function solve() {
    const typeProduct = document.getElementById('type-product');
    const descriprion = document.getElementById('description');
    const clientName = document.getElementById('client-name');
    const clientPhone = document.getElementById('client-phone');

    const recivedOrders = document.getElementById('received-orders');
    const completeOrders = document.getElementById('completed-orders');
    const clearBtn = document.querySelector("#completed-orders > button");

    document.querySelector("#right > form > button").addEventListener('click',sendOrder);
    function sendOrder(e){
        e.preventDefault();

        if(
            typeProduct.value == ''
            || descriprion.value == ''
            || clientName.value == ''
            || clientPhone.value == ''
        ){
            return
        }
        const divElementInfo = createElement('div','container',undefined,undefined);

        createElement('h2',undefined,`Product type for repair: ${typeProduct.value}`,divElementInfo);
        createElement('h3',undefined,`Client information: ${clientName.value}, ${clientPhone.value}`,divElementInfo);
        createElement('h4',undefined,`Description of the problem: ${descriprion.value}`,divElementInfo)

        let startBtn = createElement('button','start-btn','Start repair',undefined);

        let finishBtn = createElement('button','finish-btn','Finish repair',undefined);
        finishBtn.disabled = true;

        divElementInfo.appendChild(startBtn);
        divElementInfo.appendChild(finishBtn);

        recivedOrders.appendChild(divElementInfo);
        clearInputFileds()

        startBtn.addEventListener('click', onStart);
        function onStart(){
            startBtn.disabled = true;
            finishBtn.disabled = false;
        }

        finishBtn.addEventListener('click',onFinish)
        function onFinish(){
            startBtn.remove()
            finishBtn.remove()

            completeOrders.appendChild(divElementInfo);
        }

        clearBtn.addEventListener('click',onClear);
        function onClear(e){
            let target = e.target;
            let parentChild = Array.from(e.target.parentElement.children);
            let index = parentChild.indexOf(target);

            parentChild.splice(index + 1);

            e.target.parentElement.innerHTML = '';

            for(let el of parentChild){                                
                completeOrders.appendChild(el)
            }
        }
    }

    function createElement(type,classType,text,parent){
        let element = document.createElement(type);
        if(classType !== undefined){
            element.className = classType
        }
        if(text !== undefined){
            element.textContent = text;
        }
        if(parent !== undefined){
            parent.appendChild(element)
            return;
        }
        return element;
    }

    function clearInputFileds(){
        typeProduct.value = ''
        descriprion.value = ''
        clientName.value = ''
        clientPhone.value = ''
    }

}