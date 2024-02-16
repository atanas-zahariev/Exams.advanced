const {expect} = require('chai');

const library = {
    calcPriceOfBook(nameOfBook, year) {

        let price = 20;
        if (typeof nameOfBook != "string" || !Number.isInteger(year)) {
            throw new Error("Invalid input");
        } else if (year <= 1980) {
            let total = price - (price * 0.5);
            return `Price of ${nameOfBook} is ${total.toFixed(2)}`;
        }
        return `Price of ${nameOfBook} is ${price.toFixed(2)}`;
    },

    findBook: function(booksArr, desiredBook) {
        if (booksArr.length == 0) {
            throw new Error("No books currently available");
        } else if (booksArr.find(e => e == desiredBook)) {
            return "We found the book you want.";
        } else {
            return "The book you are looking for is not here!";
        }

    },
    arrangeTheBooks(countBooks) {
        const countShelves = 5;
        const availableSpace = countShelves * 8;

        if (!Number.isInteger(countBooks) || countBooks < 0) {
            throw new Error("Invalid input");
        } else if (availableSpace >= countBooks) {
            return "Great job, the books are arranged.";
        } else {
            return "Insufficient space, more shelves need to be purchased.";
        }
    }

};

describe('test', () => {
    it('test first function', () => {
        expect(() => library.calcPriceOfBook(20,2)).to.throw(Error);
        expect(() => library.calcPriceOfBook([20],2)).to.throw(Error);
        expect(() => library.calcPriceOfBook({},2)).to.throw(Error);

        expect(() => library.calcPriceOfBook('Sinuhe the Egiptchans', 1992.1)).to.throw(Error);
        expect(() => library.calcPriceOfBook('Sinuhe the Egiptchans', '1992.1')).to.throw(Error);
        expect(() => library.calcPriceOfBook('Sinuhe the Egiptchans', [1992.1])).to.throw(Error);
        expect(() => library.calcPriceOfBook('Sinuhe the Egiptchans', {})).to.throw(Error);
        
        expect(library.calcPriceOfBook('Sinuhe the Egiptchans',1980)).to.equal(`Price of Sinuhe the Egiptchans is 10.00`);
        expect(library.calcPriceOfBook('Sinuhe the Egiptchans',1979)).to.equal(`Price of Sinuhe the Egiptchans is 10.00`);
        expect(library.calcPriceOfBook('Sinuhe the Egiptchans',1981)).to.equal(`Price of Sinuhe the Egiptchans is 20.00`);

    })
    it('test second function', () => {
        let myFunction = library.findBook;

        expect(() => myFunction([], 'Thas Capital')).to.throw(Error);
        expect(myFunction(['Thas Capital','1984'],'Thas Capital')).to.equal("We found the book you want.");
        expect(myFunction(['Synuhe The Egyptchans', 'Thas Capital'],'Vinetu')).to.equal("The book you are looking for is not here!")
    })
    it('test third function', () => {
        expect(() => library.arrangeTheBooks(2.1)).to.throw(Error);
        expect(() => library.arrangeTheBooks('2.1')).to.throw(Error);
        expect(() => library.arrangeTheBooks([2.1])).to.throw(Error);
        expect(() => library.arrangeTheBooks({})).to.throw(Error);
        expect(() => library.arrangeTheBooks(-1)).to.throw(Error);

        expect(library.arrangeTheBooks(40)).to.equal("Great job, the books are arranged.");
        expect(library.arrangeTheBooks(35)).to.equal("Great job, the books are arranged.");
        expect(library.arrangeTheBooks(50)).to.equal("Insufficient space, more shelves need to be purchased.");

    })
})