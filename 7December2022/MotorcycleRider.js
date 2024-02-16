const {expect} = require('chai');

const motorcycleRider = {
  licenseRestriction(category) {
    if (category === "AM") {
      return 'Mopeds with a maximum design speed of 45 km. per hour, engine volume is no more than 50 cubic centimeters, and the minimum age is 16.'
    } else if (category === "A1") {
      return 'Motorcycles with engine volume is no more than 125 cubic centimeters, maximum power of 11KW. and the minimum age is 16.'
    } else if (category === "A2") {
      return 'Motorcycles with maximum power of 35KW. and the minimum age is 18.'
    } else if (category === "A") {
      return 'No motorcycle restrictions, and the minimum age is 24.'
    } else {
      throw new Error("Invalid Information!");
    }
  },
  motorcycleShowroom(engineVolume, maximumEngineVolume) {
    if (!Array.isArray(engineVolume) || typeof maximumEngineVolume !== "number" || engineVolume.length < 1 || maximumEngineVolume < 50) {
      throw new Error("Invalid Information!");
    }
    let availableBikes = [];
    engineVolume.forEach((engine) => {

      if (engine <= maximumEngineVolume && engine >= 50) {
        availableBikes.push(engine);
      }
    });
    return `There are ${availableBikes.length} available motorcycles matching your criteria!`;
  },
  otherSpendings(equipment, consumables, discount) {
    if (
      !Array.isArray(equipment) ||
      !Array.isArray(consumables) ||
      typeof discount !== "boolean"
    ) {
      throw new Error("Invalid Information!");
    }
    let totalPrice = 0;

    equipment.forEach((element) => {
      if (element === "helmet") {
        totalPrice += 200
      } else if (element === "jacked") {
        totalPrice += 300
      }
    });

    consumables.forEach((element) => {
      if (element === "engine oil") {
        totalPrice += 70
      } else if (element === "oil filter") {
        totalPrice += 30
      }
    });
    if (discount) {
      totalPrice = totalPrice * 0.9;
      return `You spend $${totalPrice.toFixed(2)} for equipment and consumables with 10% discount!`
    } else {
      return `You spend $${totalPrice.toFixed(2)} for equipment and consumables!`
    }

  }
};

describe('testing motorcycleRider object', () => {
  describe('test first function', () => {
    it('check first requirement', () => {
      expect(motorcycleRider.licenseRestriction('AM')).to.equal('Mopeds with a maximum design speed of 45 km. per hour, engine volume is no more than 50 cubic centimeters, and the minimum age is 16.')
    })
    it('check second requirement', () => {
      expect(motorcycleRider.licenseRestriction('A1')).to.equal('Motorcycles with engine volume is no more than 125 cubic centimeters, maximum power of 11KW. and the minimum age is 16.')
    })
    it('check third requirement', () => {
      expect(motorcycleRider.licenseRestriction('A2')).to.equal('Motorcycles with maximum power of 35KW. and the minimum age is 18.')
    })
    it('check fourth requirement', () => {
      expect(motorcycleRider.licenseRestriction('A2')).to.equal('Motorcycles with maximum power of 35KW. and the minimum age is 18.')
    })
    it('check for invalid input', () => {
      expect(() => motorcycleRider.licenseRestriction('B')).to.throw(Error)
    })
    it('check for invalid input', () => {
      expect(() => motorcycleRider.licenseRestriction([])).to.throw(Error)
    })
    it('check for invalid input', () => {
      expect(() => motorcycleRider.licenseRestriction({})).to.throw(Error)
    })
    it('check for invalid input', () => {
      expect(() => motorcycleRider.licenseRestriction(2)).to.throw(Error)
    })

  })
  describe('test second function', () => {
    it('testing for wrong first argument', () => {
      expect(() => motorcycleRider.motorcycleShowroom({}, 60)).to.throw(Error)
    })
    it('testing for wrong first argument', () => {
      expect(() => motorcycleRider.motorcycleShowroom([], 60)).to.throw(Error)
    })
    it('testing for wrong first argument', () => {
      expect(() => motorcycleRider.motorcycleShowroom(20, 60)).to.throw(Error)
    })
    it('testing for wrong first argument', () => {
      expect(() => motorcycleRider.motorcycleShowroom('abc', 60)).to.throw(Error)
    })
    it('testing for wrong second argument', () => {
      expect(() => motorcycleRider.motorcycleShowroom([20, 40], 'abc')).to.throw(Error)
    })
    it('testing for wrong second argument', () => {
      expect(() => motorcycleRider.motorcycleShowroom([20, 40], 49)).to.throw(Error)
    })
    it('testing for wrong second argument', () => {
      expect(() => motorcycleRider.motorcycleShowroom([20, 40], [20])).to.throw(Error)
    })
    it('testing for wrong second argument', () => {
      expect(() => motorcycleRider.motorcycleShowroom([20, 40], {})).to.throw(Error)
    })
    it('testing result', () => {
      expect(motorcycleRider.motorcycleShowroom([125, 250, 600], 50)).to.equal(`There are 0 available motorcycles matching your criteria!`)
    })
    it('testing result', () => {
      expect(motorcycleRider.motorcycleShowroom([125, 250, 600], 600)).to.equal(`There are 3 available motorcycles matching your criteria!`)
    })
    it('testing result', () => {
      expect(motorcycleRider.motorcycleShowroom(['125', '250', '600'], 600)).to.equal(`There are 3 available motorcycles matching your criteria!`)
    })
    it('testing result', () => {
      expect(motorcycleRider.motorcycleShowroom([125, 250, 600], 250)).to.equal(`There are 2 available motorcycles matching your criteria!`)
    })
    it('testing result', () => {
      expect(motorcycleRider.motorcycleShowroom(['abc', 250, 600], 250)).to.equal(`There are 1 available motorcycles matching your criteria!`)
    })
    it('testing result', () => {
      expect(motorcycleRider.motorcycleShowroom([[], 250, 600], 250)).to.equal(`There are 1 available motorcycles matching your criteria!`)
    })
    it('testing result', () => {
      expect(motorcycleRider.motorcycleShowroom([{}, 250, 600], 250)).to.equal(`There are 1 available motorcycles matching your criteria!`)
    })
    it('testing result', () => {
      expect(motorcycleRider.motorcycleShowroom([125, '250', 600], 250)).to.equal(`There are 2 available motorcycles matching your criteria!`)
    })
    it('testing result', () => {
      expect(motorcycleRider.motorcycleShowroom([40, 250, 600], 600)).to.equal(`There are 2 available motorcycles matching your criteria!`)
    })
  })
  describe('test third function', () => {
    it('testing for wrong first argument', () => {
      expect(() => motorcycleRider.otherSpendings('abc', ["engine oil", "oil filter"], true)).to.throw(Error)
    })
    it('testing for wrong first argument', () => {
      expect(() => motorcycleRider.otherSpendings({}, ["engine oil", "oil filter"], true)).to.throw(Error)
    })
    it('testing for wrong first argument', () => {
      expect(() => motorcycleRider.otherSpendings(20, ["engine oil", "oil filter"], true)).to.throw(Error)
    })
    it('testing for wrong second argument',() => {
      expect(() => motorcycleRider.otherSpendings(["helmet","jacked"],'abc',false)).to.throw(Error)
    })
    it('testing for wrong second argument',() => {
      expect(() => motorcycleRider.otherSpendings(["helmet","jacked"],{},false)).to.throw(Error)
    })
    it('testing for wrong second argument',() => {
      expect(() => motorcycleRider.otherSpendings(["helmet","jacked"],20,false)).to.throw(Error)
    })
    it('testing for wrong third argument',() => {
      expect(() => motorcycleRider.otherSpendings(["helmet","jacked"],["engine oil", "oil filter"],'abc')).to.throw(Error)
    })
    it('testing for wrong third argument',() => {
      expect(() => motorcycleRider.otherSpendings(["helmet","jacked"],["engine oil", "oil filter"],[])).to.throw(Error)
    })
    it('testing for wrong third argument',() => {
      expect(() => motorcycleRider.otherSpendings(["helmet","jacked"],["engine oil", "oil filter"],{})).to.throw(Error)
    })
    it('testing for wrong third argument',() => {
      expect(() => motorcycleRider.otherSpendings(["helmet","jacked"],["engine oil", "oil filter"],2)).to.throw(Error)
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],["engine oil","oil filter"],false)).to.equal('You spend $600.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],["oil filter"],false)).to.equal('You spend $530.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],["engine oil"],false)).to.equal('You spend $570.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["jacked"],["engine oil","oil filter"],false)).to.equal('You spend $400.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet"],["engine oil","oil filter"],false)).to.equal('You spend $300.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],[],false)).to.equal('You spend $500.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings([],["engine oil","oil filter"],false)).to.equal('You spend $100.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["abc","test"],["engine oil","oil filter"],false)).to.equal('You spend $100.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings([20,30],["engine oil","oil filter"],false)).to.equal('You spend $100.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings([{},'30'],["engine oil","oil filter"],false)).to.equal('You spend $100.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],['abc','test'],false)).to.equal('You spend $500.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],[20,30],false)).to.equal('You spend $500.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],[{},'30'],false)).to.equal('You spend $500.00 for equipment and consumables!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],["engine oil","oil filter"],true)).to.equal('You spend $540.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings([],["engine oil","oil filter"],true)).to.equal('You spend $90.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(['abc','test'],["engine oil","oil filter"],true)).to.equal('You spend $90.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings([{},20],["engine oil","oil filter"],true)).to.equal('You spend $90.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["jacked"],["engine oil","oil filter"],true)).to.equal('You spend $360.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet"],["engine oil","oil filter"],true)).to.equal('You spend $270.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],["oil filter"],true)).to.equal('You spend $477.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],["engine oil"],true)).to.equal('You spend $513.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],[],true)).to.equal('You spend $450.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],['abc','test'],true)).to.equal('You spend $450.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],[{},'20'],true)).to.equal('You spend $450.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],[undefined],true)).to.equal('You spend $450.00 for equipment and consumables with 10% discount!')
    })
    it('testing result', () => {
      expect(motorcycleRider.otherSpendings(["helmet","jacked"],[null,null],true)).to.equal('You spend $450.00 for equipment and consumables with 10% discount!')
    })
  })
})