// import { expect } from './node_modules/chai/chai.js'
let expect = require('chai').expect;


const bookSelection = {
  isGenreSuitable(genre, age) {
    if (age <= 12 && (genre === "Thriller" || genre === "Horror")) {
      return `Books with ${genre} genre are not suitable for kids at ${age} age`;
    } else {
      return `Those books are suitable`;
    }
  },
  isItAffordable(price, budget) {
    if (typeof price !== "number" || typeof budget !== "number") {
      throw new Error("Invalid input");
    }

    let result = budget - price;

    if (result < 0) {
      return "You don't have enough money";
    } else {
      return `Book bought. You have ${result}$ left`;
    }
  },
  suitableTitles(array, wantedGenre) {
    let resultArr = [];

    if (!Array.isArray(array) || typeof wantedGenre !== "string") {
      throw new Error("Invalid input");
    }
    array.map((obj) => {
      if (obj.genre === wantedGenre) {
        resultArr.push(obj.title);
      }
    });
    return resultArr;
  },
};

describe('testing bookSelection', () => {
  it('testing first function', () => {
    expect(bookSelection.isGenreSuitable('Thriller', 14)).to.equal(`Those books are suitable`);
    expect(bookSelection.isGenreSuitable("Horror", 14)).to.equal(`Those books are suitable`);
    expect(bookSelection.isGenreSuitable("Horror", 12)).to.equal(`Books with Horror genre are not suitable for kids at 12 age`);
    expect(bookSelection.isGenreSuitable("Horror", 11)).to.equal(`Books with Horror genre are not suitable for kids at 11 age`);
    expect(bookSelection.isGenreSuitable('Romance', 5)).to.equal(`Those books are suitable`)
  })
  it('testing second function', () => {
    expect(() => bookSelection.isItAffordable('10', 10)).to.throw(Error)
    expect(() => bookSelection.isItAffordable([10], 10)).to.throw(Error)
    expect(() => bookSelection.isItAffordable({}, 10)).to.throw(Error)
    expect(() => bookSelection.isItAffordable(10, '10')).to.throw(Error)
    expect(() => bookSelection.isItAffordable(10, ['10'])).to.throw(Error)
    expect(() => bookSelection.isItAffordable(10, {})).to.throw(Error)

    expect(bookSelection.isItAffordable(10, 9.99)).to.equal("You don't have enough money");
    expect(bookSelection.isItAffordable(10, 10)).to.equal("Book bought. You have 0$ left");

  })
  it('testing third function', () => {
    expect(() => bookSelection.suitableTitles("Thriller", "Thriller")).to.throw(Error);
    expect(() => bookSelection.suitableTitles(10, "Thriller")).to.throw(Error);
    expect(() => bookSelection.suitableTitles({}, "Thriller")).to.throw(Error);
    expect(() => bookSelection.suitableTitles([{ title: "The Da Vinci Code", genre: "Thriller" }, { title: "Leonardo Shiffer", genre: "Thriller" }], 10));
    expect(() => bookSelection.suitableTitles([{ title: "The Da Vinci Code", genre: "Thriller" }, { title: "Leonardo Shiffer", genre: "Thriller" }], {}));
    expect(() => bookSelection.suitableTitles([{ title: "The Da Vinci Code", genre: "Thriller" }, { title: "Leonardo Shiffer", genre: "Thriller" }], [10]));

    //expect(bookSelection.suitableTitles([{ title: "The Da Vinci Code", genre: "Thriller" }],"Thriller")).to.eql(["The Da Vinci Code"])
    expect(bookSelection.suitableTitles([{ title: "The Da Vinci Code", genre: "Thriller" }], "Thriller")).to.deep.equal(["The Da Vinci Code"])
  })
})
