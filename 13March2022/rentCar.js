const { expect } = require('chai');

const rentCar = {
    searchCar(shop, model) {
        let findModel = [];
        if (Array.isArray(shop) && typeof model == 'string') {
            for (let i = 0; i < shop.length; i++) {
                if (model == shop[i]) {
                    findModel.push(shop[i]);
                }
            }
            if (findModel.length !== 0) {
                return `There is ${findModel.length} car of model ${model} in the catalog!`;
            } else {
                throw new Error('There are no such models in the catalog!')
            }
        } else {
            throw new Error('Invalid input!')
        }
    },
    calculatePriceOfCar(model, days) {
        let catalogue = {
            Volkswagen: 20,
            Audi: 36,
            Toyota: 40,
            BMW: 45,
            Mercedes: 50
        };

        if (typeof model == 'string' && Number.isInteger(days)) {
            if (catalogue.hasOwnProperty(model)) {
                let cost = catalogue[model] * days;
                return `You choose ${model} and it will cost $${cost}!`
            } else {
                throw new Error('No such model in the catalog!')
            }
        } else {
            throw new Error('Invalid input!')
        }
    },
    checkBudget(costPerDay, days, budget) {
        if (!Number.isInteger(costPerDay) || !Number.isInteger(days) || !Number.isInteger(budget)) {
            throw new Error('Invalid input!');
        } else {
            let cost = costPerDay * days;
            if (cost <= budget) {
                return `You rent a car!`
            } else {
                return 'You need a bigger budget!'
            }
        }
    }
}

describe('testing rentCar', () => {
    it('testing first function', () => {
        expect(() => rentCar.searchCar('abv', "BMW")).to.throw(Error);
        expect(() => rentCar.searchCar(20, "BMW")).to.throw(Error);
        expect(() => rentCar.searchCar({}, "BMW")).to.throw(Error);
        expect(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 20)).to.throw(Error);
        expect(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], {})).to.throw(Error);
        expect(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], [20])).to.throw(Error);
        expect(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 'ABv')).to.throw(Error);

        expect(rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 'BMW')).to.equal(`There is 1 car of model BMW in the catalog!`);
    })
    it('testing second function', () => {
        expect(() => rentCar.calculatePriceOfCar(20, 2)).to.throw(Error);
        expect(() => rentCar.calculatePriceOfCar({}, 2)).to.throw(Error);
        expect(() => rentCar.calculatePriceOfCar([20], 2)).to.throw(Error);
        expect(() => rentCar.calculatePriceOfCar('BMW', 2.5)).to.throw(Error);
        expect(() => rentCar.calculatePriceOfCar('BMW', '3')).to.throw(Error);
        expect(() => rentCar.calculatePriceOfCar('BMW', [2])).to.throw(Error);

        expect(() => rentCar.calculatePriceOfCar('Trabant', 2)).to.throw(Error);

        expect(rentCar.calculatePriceOfCar('BMW', 3)).to.equal(`You choose BMW and it will cost $135!`);
        expect(rentCar.calculatePriceOfCar('BMW', 0)).to.equal(`You choose BMW and it will cost $0!`);
        expect(rentCar.calculatePriceOfCar('BMW', -1)).to.equal(`You choose BMW and it will cost $-45!`);
    })
    it('testing third function', () => {
        expect(() => rentCar.checkBudget('20', 5, 100)).to.throw(Error);
        expect(() => rentCar.checkBudget(20.1, 5, 100)).to.throw(Error);
        expect(() => rentCar.checkBudget([20], 5, 100)).to.throw(Error);
        expect(() => rentCar.checkBudget({}, 5, 100)).to.throw(Error);
        expect(() => rentCar.checkBudget(20, '5', 100)).to.throw(Error);
        expect(() => rentCar.checkBudget(20, [5], 100)).to.throw(Error);
        expect(() => rentCar.checkBudget(20, 5.1, 100)).to.throw(Error);
        expect(() => rentCar.checkBudget(20, {}, 100)).to.throw(Error);
        expect(() => rentCar.checkBudget(20, 5, '100')).to.throw(Error);
        expect(() => rentCar.checkBudget(20, 5, 100.05)).to.throw(Error);
        expect(() => rentCar.checkBudget(20, 5, [100])).to.throw(Error);
        expect(() => rentCar.checkBudget(20, 5, {})).to.throw(Error);

        expect(rentCar.checkBudget(20, 5, 100)).to.equal(`You rent a car!`);

        expect(rentCar.checkBudget(20, 6, 100)).to.equal('You need a bigger budget!');

    })
})