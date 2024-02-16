const { expect } = require('chai');

const carService = {
    isItExpensive(issue) {
        if (issue === "Engine" || issue === "Transmission") {
            return `The issue with the car is more severe and it will cost more money`;
        } else {
            return `The overall price will be a bit cheaper`;
        }
    },
    discount(numberOfParts, totalPrice) {
        if (
            typeof numberOfParts !== "number" ||
            typeof totalPrice !== "number"
        ) {
            throw new Error("Invalid input");
        }

        let discountPercentage = 0;

        if (numberOfParts > 2 && numberOfParts <= 7) {
            discountPercentage = 15;
        } else if (numberOfParts > 7) {
            discountPercentage = 30;
        }

        let result = (discountPercentage / 100) * totalPrice;

        if (numberOfParts <= 2) {
            return "You cannot apply a discount";
        } else {
            return `Discount applied! You saved ${result}$`;
        }
    },
    partsToBuy(partsCatalog, neededParts) {
        let totalSum = 0;

        if (!Array.isArray(partsCatalog) || !Array.isArray(neededParts)) {//
            throw new Error("Invalid input");
        }
        neededParts.forEach((neededPart) => {
            partsCatalog.map((obj) => {
                if (obj.part === neededPart) {
                    totalSum += obj.price;
                }
            });
        });

        return totalSum;
    },
};

describe('test carService', () => {
    it('testing first function', () => {
        expect(carService.isItExpensive("Engine")).to.equal(`The issue with the car is more severe and it will cost more money`)
        expect(carService.isItExpensive("Transmission")).to.equal(`The issue with the car is more severe and it will cost more money`)
        expect(carService.isItExpensive("charkc")).to.equal(`The overall price will be a bit cheaper`)
    })
    it('testing second function', () => {
        expect(() => carService.discount('20', 20)).to.throw(Error)
        expect(() => carService.discount({}, 20)).to.throw(Error)
        expect(() => carService.discount([20], 20)).to.throw(Error)
        expect(() => carService.discount(20, '20')).to.throw(Error)
        expect(() => carService.discount(20, {})).to.throw(Error)
        expect(() => carService.discount(20, [20])).to.throw(Error)

        expect(carService.discount(1, 100)).to.equal(`You cannot apply a discount`);
        expect(carService.discount(2, 100)).to.equal(`You cannot apply a discount`);
        expect(carService.discount(3, 100)).to.equal(`Discount applied! You saved 15$`);
        expect(carService.discount(7, 100)).to.equal(`Discount applied! You saved 15$`);
        expect(carService.discount(8, 100)).to.equal(`Discount applied! You saved 30$`);
    })
    it('testing third function', () => {
        expect(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], "blowoff valve")).to.throw(Error)
        expect(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], {})).to.throw(Error)
        expect(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], 20)).to.throw(Error)
        expect(() => carService.partsToBuy({}, ["blowoff valve", "injectors"])).to.throw(Error)
        expect(() => carService.partsToBuy(20, ["blowoff valve", "injectors"])).to.throw(Error)
        expect(() => carService.partsToBuy("blowoff valve", ["blowoff valve", "injectors"])).to.throw(Error)

        expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], ["blowoff valve", "injectors"])).to.equal(145)
        expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], ["abv", "injectors"])).to.equal(0)
        expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "blowoff valve", price: 145 }], ["blowoff valve", "injectors"])).to.equal(290)
        expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "blowoff valve", price: 145 }], [])).to.equal(0)
        expect(carService.partsToBuy([], ["blowoff valve", "injectors"])).to.equal(0)
        expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], ["blowoff valve", "coil springs"])).to.equal(375)


    })
})

