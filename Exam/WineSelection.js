class  WineSelection{
    constructor(space){
       this.space = space;
       this.wines = [];
       this.bill = 0;
    }

    reserveABottle (wineName, wineType, price){
        if(this.space == 0){
            throw new Error(  "Not enough space in the cellar.")
        }
        this.space--
        this.wines.push({
            wineName,
            wineType,
            price,
            paid: false
        })
        return `You reserved a bottle of ${wineName} ${wineType} wine.`
    }

    payWineBottle( wineName, price ) {
        let target = this.wines.find(w => w.wineName == wineName);

        if(!target){
            throw new Error(`${wineName} is not in the cellar.`)
        }else if(target.paid == true){
            throw new Error(`${wineName} has already been paid.`)
        }else{
            target.paid = true;
            this.bill += price;
            return `You bought a ${wineName} for a ${price}$.`
        }
    }

    openBottle(wineName){
        let target = this.wines.find(w => w.wineName == wineName);
        
        if(!target){
            throw new Error(`The wine, you're looking for, is not found.`)
        }else if(target.paid == false){
            throw new Error(`${wineName} need to be paid before open the bottle.`)
        }else{
            let index = this.wines.indexOf(target);
            this.wines.splice(index,1);

            return `You drank a bottle of ${wineName}.`
        }
    }

    cellarRevision(wineType){
        let toPrint = []
        if(wineType == undefined){
          toPrint.push(`You have space for ${this.space} bottles more.`);
          toPrint.push(`You paid ${this.bill}$ for the wine.`)
          this.wines.sort((a, b) => a.wineName.localeCompare(b.wineName)).forEach(w => {
            if(w.paid){
                toPrint.push(`${w.wineName} > ${w.wineType} - Has Paid.`)
            }else{
                toPrint.push(`${w.wineName} > ${w.wineType} - Not Paid.`)

            }
          })
        }else{
            let target = this.wines.find(w => w.wineType == wineType);

            if(target != undefined){
                let isPaid = target.paid;
                if(isPaid){
                    toPrint.push(`${target.wineName} > ${target.wineType} - Has Paid.`)
                }else{
                    toPrint.push(`${target.wineName} > ${target.wineType} - Not Paid.`)

                }
            }else{
                throw new Error(`There is no ${wineType} in the cellar.`)
            }

        }

        return toPrint.join('\n');
    }
}

const selection = new WineSelection(5)
selection.reserveABottle('Bodegas Godelia Mencía', 'Rose', 144);
selection.payWineBottle('Bodegas Godelia Mencía', 144);
selection.reserveABottle('Sauvignon Blanc Marlborough', 'White', 50);
selection.reserveABottle('Cabernet Sauvignon Napa Valley', 'Red', 120);
console.log(selection.cellarRevision());