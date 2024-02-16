class VegetableStore{
    constructor(owner,location){
        this.owner = owner;
        this.location = location;
        this.availableProducts = [];
    }

    loadingVegetables (vegetables){
        let uniqName = new Set()
        vegetables.forEach(el => { 
            let [type,quantity,price] = el.split(' ')

            uniqName.add(type);

            quantity = Number(quantity);
            price = Number(price);


            let isOnList = this.availableProducts.find(v => v.type == type);

            if(isOnList){
                if(price > isOnList.price){
                    isOnList.price = price;
                }
                isOnList.quantity += quantity;
            }else{
                this.availableProducts.push({
                    type,
                    quantity,
                    price
                })
            }
        })
        let toPrint = []
        for(let el of uniqName){
           toPrint.push(el)
        }

        return `Successfully added ${toPrint.join(', ')}`
    }

    buyingVegetables (selectedProducts){
        let totalPrice = 0;
        selectedProducts.forEach(chois => {
            let [type,quantity] = chois.split(' ')
            quantity = Number(quantity);

            let isFound = this.availableProducts.find(v => v.type == type);
            if(!isFound){
                throw new Error(`${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`)
            }else if( quantity > isFound.quantity){
                throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`)
            }else{
                totalPrice += (isFound.price * quantity);
                isFound.quantity -= quantity;
            }
        })

        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`
    }

    rottingVegetable (type, quantity){
        let isFound = this.availableProducts.find(v => v.type == type);

        if(!isFound){
            throw new Error(`${type} is not available in the store.`)
        }else if(quantity > isFound.quantity){
            isFound.quantity = 0;
            return `The entire quantity of the ${type} has been removed.`
        }else{
            isFound.quantity -= quantity;
            return `Some quantity of the ${type} has been removed.`
        }
    }

    revision (){
        let toPrint = [`Available vegetables:`];

        this.availableProducts.sort((a, b) => a.price - b.price).forEach(el => {
            toPrint.push(`${el.type}-${el.quantity}-$${el.price}`)
        })
        toPrint.push(`The owner of the store is ${this.owner}, and the location is ${this.location}.`)

        return toPrint.join('\n')
    }
}


let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta, Sofia");
console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"]));
console.log(vegStore.rottingVegetable("Okra", 1));
console.log(vegStore.rottingVegetable("Okra", 2.5));
console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"]));
console.log(vegStore.revision());