class Garden {
    constructor(spaceAvailable) {
        this.spaceAvailable = spaceAvailable;
        this.plants = [];
        this.storage = [];
    }

    addPlant(plantName, spaceRequired) {
        if ((this.spaceAvailable - spaceRequired) < 0) {
            throw new Error("Not enough space in the garden.")
        } else {
            this.spaceAvailable -= spaceRequired;

            let plant = {
                plantName,
                spaceRequired,
                ripe: false,
                quantity: 0
            }
            this.plants.push(plant);
            return `The ${plantName} has been successfully planted in the garden.`
        }
    }

    ripenPlant(plantName, quantity) {
        let plant = this.plants.find(p => p.plantName == plantName);
        if (plant == undefined) {
            throw new Error(`There is no ${plantName} in the garden.`)
        } else if (plant.ripe == true) {
            throw new Error(`The ${plantName} is already ripe.`)
        } else if (quantity <= 0) {
            throw new Error("The quantity cannot be zero or negative.")
        } else {
            plant.ripe = true;
            plant.quantity += quantity;
            if (quantity == 1) {
                return `${quantity} ${plantName} has successfully ripened.`
            } else if (quantity > 1) {
                return `${quantity} ${plantName}s have successfully ripened.`
            }
        }
    }

    harvestPlant(plantName) {
        let plant = this.plants.find(p => p.plantName == plantName);
        if (plant == undefined) {
            throw new Error(`There is no ${plantName} in the garden.`)
        } else if (plant.ripe == false) {
            throw new Error(`The ${plantName} cannot be harvested before it is ripe.`)
        } else {
            let index = this.plants.indexOf(plant);
            this.plants.splice(index, 1)
            this.storage.push({ plantName, quantity: plant.quantity })
            this.spaceAvailable += plant.spaceRequired;

            return `The ${plantName} has been successfully harvested.`
        }
    }

    generateReport() {
        let sorted = this.plants.sort((a, b) => a.plantName.localeCompare(b.plantName)).map(plant => plant.plantName);
        let storeReport = 'Plants in storage: '
        if (this.storage.length == 0) {
            storeReport += 'The storage is empty.'
        } else {
            let buff = '';
            this.storage.forEach((plant,i) => {
                if(i == this.storage.length - 1){
                    storeReport += plant.plantName + ' '
                    storeReport += `(${plant.quantity})`
                }else{
                    storeReport += plant.plantName + ' '
                    storeReport += `(${plant.quantity}), `
                }
                //storeReport += buff;
            })
        }
        let report = [
            `The garden has ${this.spaceAvailable} free space left.`,
            `Plants in the garden: ${sorted.join(', ')}`,
            `${storeReport}`
        ]
        return report.join('\n')
    }
}

const myGarden = new Garden(250)
console.log(myGarden.addPlant('apple', 20));
console.log(myGarden.addPlant('orange', 200));
console.log(myGarden.addPlant('raspberry', 10));
console.log(myGarden.ripenPlant('apple', 10));
console.log(myGarden.ripenPlant('orange', 1));
console.log(myGarden.harvestPlant('orange'));
console.log(myGarden.harvestPlant('apple'));

console.log(myGarden.generateReport());