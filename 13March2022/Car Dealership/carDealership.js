class CarDealership {
    constructor(name) {
        this.name = name;
        this.availableCars = [];
        this.soldCars = [];
        this.totalIncome = 0;
    }

    addCar(model, horsepower, price, mileage) {
        if ((typeof (model) != 'string' || model.length == 0) ||
            (typeof (horsepower) != 'number' || Number.isInteger(horsepower) == false || horsepower < 0)
            || (typeof (price) != 'number' || price < 0) || (typeof (mileage) != 'number' || mileage < 0)) {
            throw new Error("Invalid input!")
        };

        this.availableCars.push({
            model,
            horsepower,
            price,
            mileage
        })

        price = (price.toFixed(2))
        mileage = (mileage.toFixed(2))

        return `New car added: ${model} - ${horsepower} HP - ${mileage} km - ${price}$`
    }

    sellCar(model, desiredMileage) {
        let car = this.availableCars.find(c => c.model == model);
        if (car == undefined) {
            throw new Error(`${model} was not found!`)
        }

        let difference = car.mileage - desiredMileage;
        let soldPrice;
        if (difference <= 0) {
            soldPrice = car.price;
        } else if (difference <= 40000) {
            soldPrice = car.price * 0.95
        } else {
            soldPrice = car.price * 0.9
        }

        car.price = soldPrice;

        let index = this.availableCars.indexOf(car);
        this.availableCars.splice(index, 1);

        this.soldCars.push(car);
        this.totalIncome += soldPrice;
        return `${model} was sold for ${soldPrice.toFixed(2)}$`
    }

    currentCar (){
        if(this.availableCars.length > 0){
            let arr = ['-Available cars:']
            this.availableCars.forEach(car => {
                arr.push(`---${car.model} - ${car.horsepower} HP - ${car.mileage.toFixed(2)} km - ${car.price.toFixed(2)}$`)
            })
           return arr.join('\n')
        }else{
            return `There are no available cars`
        }
    }

    salesReport (criteria){
        let possibleCriteria = [ "horsepower", "model"];

        if(!possibleCriteria.includes(criteria)){
            throw new Error("Invalid criteria!")
        }
        if(criteria == "horsepower"){
            this.soldCars.sort((a, b) => b.horsepower - a.horsepower)
        }else{
            this.soldCars.sort((a, b) => a.model.localeCompare(b.model))
        }

        let report = [`-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$`,`-${this.soldCars.length} cars sold:`]

        this.soldCars.forEach(car => {
            report.push(`---${car.model} - ${car.horsepower} HP - ${car.price.toFixed(2)}$`)
        })

        return report.join('\n');
    }
}

let dealership = new CarDealership('SoftAuto');
dealership.addCar('Toyota Corolla', 100, 3500, 190000);
dealership.addCar('Mercedes C63', 300, 29000, 187000);
dealership.addCar('Audi A3', 120, 4900, 240000);
dealership.sellCar('Toyota Corolla', 230000);
dealership.sellCar('Mercedes C63', 110000);
console.log(dealership.salesReport('horsepower'));