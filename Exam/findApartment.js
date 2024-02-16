const {expect} = require('chai');

const findNewApartment = {
  isGoodLocation(city, nearPublicTransportation) {
    if (typeof city !== "string" || typeof nearPublicTransportation !== "boolean"){
        throw new Error("Invalid input!");
    }
    if (city !== "Sofia" && city !== "Plovdiv" && city !== "Varna") {
        return "This location is not suitable for you.";
    }else {
        if (nearPublicTransportation == true) {
            return "You can go on home tour!";
        }
        else {
            return "There is no public transport in area.";
        }
    }
  },
  isLargeEnough(apartments, minimalSquareMeters) {
    let resultArr = [];
    if (!Array.isArray(apartments) || typeof minimalSquareMeters !== "number" || apartments.length == 0) {
      throw new Error("Invalid input!");
    }
    apartments.map((apartment) => {
      if (apartment >= minimalSquareMeters) {
        resultArr.push(apartment);
      }
    });
    return resultArr.join(', ');
  },
  isItAffordable(price, budget) {
    if (typeof price !== "number" || typeof budget !== "number"
     || price <= 0 || budget <= 0) {
      throw new Error("Invalid input!");
    }
    let result = budget - price;
    if (result < 0) {
      return "You don't have enough money for this house!";
    } else {
      return "You can afford this home!";
    }
  },
};

describe('test',() => {
  it('test first function', () => {
    expect(() => findNewApartment.isGoodLocation(20,true)).to.throw(Error)
    expect(() => findNewApartment.isGoodLocation([20],true)).to.throw(Error)
    expect(() => findNewApartment.isGoodLocation({},true)).to.throw(Error)
    expect(() => findNewApartment.isGoodLocation(true,true)).to.throw(Error)

    expect(() => findNewApartment.isGoodLocation("Sofia",'')).to.throw(Error)
    expect(() => findNewApartment.isGoodLocation("Sofia",'abv')).to.throw(Error)
    expect(() => findNewApartment.isGoodLocation("Sofia",10)).to.throw(Error)
    expect(() => findNewApartment.isGoodLocation("Sofia",[])).to.throw(Error)
    expect(() => findNewApartment.isGoodLocation("Sofia",{})).to.throw(Error)

   expect(findNewApartment.isGoodLocation('Sofia',true)).to.equal(`You can go on home tour!`)
   expect(findNewApartment.isGoodLocation('Sofia',false)).to.equal(`There is no public transport in area.`)

   expect(findNewApartment.isGoodLocation('Koinare',false)).to.equal(`This location is not suitable for you.`)   
  })

  it('test second function', () => {
    expect(() => findNewApartment.isLargeEnough('',20)).to.throw(Error)
    expect(() => findNewApartment.isLargeEnough('abv',20)).to.throw(Error)
    expect(() => findNewApartment.isLargeEnough({},20)).to.throw(Error)
    expect(() => findNewApartment.isLargeEnough([],20)).to.throw(Error)
    expect(() => findNewApartment.isLargeEnough(20,20)).to.throw(Error)
    expect(() => findNewApartment.isLargeEnough(true,20)).to.throw(Error)

    expect(() => findNewApartment.isLargeEnough([40, 50, 60],'')).to.throw(Error)
    expect(() => findNewApartment.isLargeEnough([40, 50, 60],'abv')).to.throw(Error)
    expect(() => findNewApartment.isLargeEnough([40, 50, 60],[])).to.throw(Error)
    expect(() => findNewApartment.isLargeEnough([40, 50, 60],{})).to.throw(Error)
    expect(() => findNewApartment.isLargeEnough([40, 50, 60],true)).to.throw(Error)

    expect(findNewApartment.isLargeEnough([40, 50, 60],70)).to.equal('')
    expect(findNewApartment.isLargeEnough([40, 50, 60],60)).to.equal('60')
    expect(findNewApartment.isLargeEnough([40, 50, 60],30)).to.equal('40, 50, 60')

    expect(findNewApartment.isLargeEnough(['40', '50', '60'],30)).to.equal('40, 50, 60')
    expect(findNewApartment.isLargeEnough(['40', '50', '60','abv'],30)).to.equal('40, 50, 60')

  })

  it('test third function' , () => {
    expect(() => findNewApartment.isItAffordable('20',20)).to.throw(Error)
    expect(() => findNewApartment.isItAffordable('abv',20)).to.throw(Error)
    expect(() => findNewApartment.isItAffordable([],20)).to.throw(Error)
    expect(() => findNewApartment.isItAffordable({},20)).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(true,20)).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(0,20)).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(-1,20)).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(20)).to.throw(Error)




    expect(() => findNewApartment.isItAffordable(20,'')).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(20,'abv')).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(20,[])).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(20,'20')).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(20,{})).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(20,true)).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(20,0)).to.throw(Error)
    expect(() => findNewApartment.isItAffordable(20,-1)).to.throw(Error)

    expect(findNewApartment.isItAffordable(20,20)).to.equal(`You can afford this home!`)
    expect(findNewApartment.isItAffordable(20,40)).to.equal(`You can afford this home!`)
    expect(findNewApartment.isItAffordable(20,10)).to.equal(`You don't have enough money for this house!`)
    expect(findNewApartment.isItAffordable(20,19.99)).to.equal(`You don't have enough money for this house!`)

  })
})


module.exports = findNewApartment;

