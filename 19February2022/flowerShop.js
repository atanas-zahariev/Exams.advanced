const { expect } = require('chai');

const flowerShop = {
    calcPriceOfFlowers(flower, price, quantity) {
        if (typeof flower != 'string' || !Number.isInteger(price) || !Number.isInteger(quantity)) {
            throw new Error('Invalid input!');
        } else {
            let result = price * quantity;
            return `You need $${result.toFixed(2)} to buy ${flower}!`;
        }
    },
    checkFlowersAvailable(flower, gardenArr) {
        if (gardenArr.indexOf(flower) >= 0) {
            return `The ${flower} are available!`;
        } else {
            return `The ${flower} are sold! You need to purchase more!`;
        }
    },
    sellFlowers(gardenArr, space) {
        let shop = [];
        let i = 0;
        if (!Array.isArray(gardenArr) || !Number.isInteger(space) || space < 0 || space >= gardenArr.length) {
            throw new Error('Invalid input!');
        } else {
            while (gardenArr.length > i) {
                if (i != space) {
                    shop.push(gardenArr[i]);
                }
                i++
            }
        }
        return shop.join(' / ');
    }
}

describe('testing FlowerShop', () => {
    it('testing first function', () => {
        expect(() => flowerShop.calcPriceOfFlowers(10, 5, 3)).to.throw(Error);
        expect(() => flowerShop.calcPriceOfFlowers([10], 5, 3)).to.throw(Error);
        expect(() => flowerShop.calcPriceOfFlowers({}, 5, 3)).to.throw(Error);

        expect(() => flowerShop.calcPriceOfFlowers("Rose", 2.5, 3)).to.throw(Error);
        expect(() => flowerShop.calcPriceOfFlowers("Rose", [2.5], 3)).to.throw(Error);
        expect(() => flowerShop.calcPriceOfFlowers("Rose", '2.5', 3)).to.throw(Error);
        expect(() => flowerShop.calcPriceOfFlowers("Rose", {}, 3)).to.throw(Error);

        expect(() => flowerShop.calcPriceOfFlowers('Rose', 5, 2.5)).to.throw(Error);
        expect(() => flowerShop.calcPriceOfFlowers('Rose', 5, [2.5])).to.throw(Error);
        expect(() => flowerShop.calcPriceOfFlowers('Rose', 5, '2.5')).to.throw(Error);
        expect(() => flowerShop.calcPriceOfFlowers('Rose', 5, {})).to.throw(Error);

        expect(flowerShop.calcPriceOfFlowers('Rose', 5, 3)).to.equal(`You need $15.00 to buy Rose!`);
        expect(flowerShop.calcPriceOfFlowers('Rose', 5, 0)).to.equal(`You need $0.00 to buy Rose!`);
        expect(flowerShop.calcPriceOfFlowers('Rose', 0, 3)).to.equal(`You need $0.00 to buy Rose!`);
        expect(flowerShop.calcPriceOfFlowers('Rose', 5, -3)).to.equal(`You need $-15.00 to buy Rose!`);
        expect(flowerShop.calcPriceOfFlowers('Rose', -5, 3)).to.equal(`You need $-15.00 to buy Rose!`);
    })
    it('testing second function', () => {
        expect(flowerShop.checkFlowersAvailable('Tmenujka', ["Rose", "Lily", "Orchid"])).to.equal(`The Tmenujka are sold! You need to purchase more!`);
        expect(flowerShop.checkFlowersAvailable('10', ["Rose", "Lily", "Orchid"])).to.equal(`The 10 are sold! You need to purchase more!`);
        expect(flowerShop.checkFlowersAvailable(10, ["Rose", "Lily", "Orchid"])).to.equal(`The 10 are sold! You need to purchase more!`);
        expect(flowerShop.checkFlowersAvailable(['Tmenujka'], ["Rose", "Lily", "Orchid"])).to.equal(`The ${['Tmenujka']} are sold! You need to purchase more!`);
        expect(flowerShop.checkFlowersAvailable({}, ["Rose", "Lily", "Orchid"])).to.equal(`The ${{}} are sold! You need to purchase more!`);


        expect(flowerShop.checkFlowersAvailable('Rose', ["Rose", "Lily", "Orchid"])).to.equal(`The Rose are available!`);
    })
    it('testing third function', () => {
        expect(() => flowerShop.sellFlowers({}, 1)).to.throw(Error);
        expect(() => flowerShop.sellFlowers('', 1)).to.throw(Error);
        expect(() => flowerShop.sellFlowers(5, 1)).to.throw(Error);

        expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 1.1)).to.throw(Error);
        expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], '1.1')).to.throw(Error);
        expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], [1.1])).to.throw(Error);
        expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], {})).to.throw(Error);
        expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 3)).to.throw(Error);
        expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], -1)).to.throw(Error);
        
        expect(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 1)).to.equal(`Rose / Orchid`);
        expect(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 2)).to.equal(`Rose / Lily`);
        expect(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 0)).to.equal(`Lily / Orchid`);


        
    })
})
