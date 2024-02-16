class OnlineShop {
	constructor(warehouseSpace){
        this.warehouseSpace = warehouseSpace;
        this.products = [];
        this.sales = [];
    }

    loadingStore(product, quantity, spaceRequired){
        if(spaceRequired > this.warehouseSpace){
            throw new Error("Not enough space in the warehouse.")
        }
        this.products.push({product,quantity})
        this.warehouseSpace -= spaceRequired
        return `The ${product} has been successfully delivered in the warehouse.`
    }

    quantityCheck(product, minimalQuantity){
        let itsHasProduct = false;
        
        if(minimalQuantity <= 0){
            throw new Error("The quantity cannot be zero or negative.")
        }
        for(let el of this.products){
            let currentProduct = el.product;
            let currentQuantity = el.quantity
            if(currentProduct === product){
                itsHasProduct = true;                
                if(minimalQuantity <= currentQuantity ){
                    return `You have enough from product ${product}.`                
                }else if(minimalQuantity > el.quantity ){
                    el.quantity = minimalQuantity;
                    return `You added ${minimalQuantity - currentQuantity} more from the ${product} products.`
                }
            }
        }
        if(!itsHasProduct){
            throw new Error(`There is no ${product} in the warehouse.`)
        }
       
    }

    sellProduct(product) {
        let temp = product
        let isFound = false;
        for(let el of this.products){
            let currentProduct = el.product;
            if(currentProduct === product){
                isFound = true;
                el.quantity--;
                this.sales.push({product:0});
                this.sales[0].product++
                return `The ${product} has been successfully sold.`
            }
        }
        if(!isFound){
            throw new Error(`There is no ${product} in the warehouse."`)
        }
    }

    revision(){
       if(this.sales.length === 0){
        throw new Error("There are no sales today!")
       }
       let buff = `You sold ${this.sales[0].product} products today!\n`
       buff += `Products in the warehouse:\n`
       for(let i = 0; i < this.products.length; i++){
            if(i === this.products.length -1 ){
                buff += `${this.products[i].product}-${this.products[i].quantity} more left`
            }else{
                buff += `${this.products[i].product}-${this.products[i].quantity} more left\n`

            }
       }
       return buff
    
    }

}

// const myOnlineShop = new OnlineShop(500)
// console.log(myOnlineShop.loadingStore('headphones', 10, 200));
// console.log(myOnlineShop.loadingStore('laptop', 5, 200));

// console.log(myOnlineShop.quantityCheck('headphones', 10));
// console.log(myOnlineShop.quantityCheck('laptop', 10));

// console.log(myOnlineShop.sellProduct('headphones'));
// console.log(myOnlineShop.sellProduct('laptop'));
// console.log(myOnlineShop.sellProduct('keyboard'));

const myOnlineShop = new OnlineShop(500)
console.log(myOnlineShop.loadingStore('headphones', 10, 200));
console.log(myOnlineShop.loadingStore('laptop', 5, 200));

console.log(myOnlineShop.quantityCheck('headphones', 10));
console.log(myOnlineShop.quantityCheck('laptop', 10));

console.log(myOnlineShop.sellProduct('headphones'));
console.log(myOnlineShop.sellProduct('laptop'));
console.log(myOnlineShop.revision());