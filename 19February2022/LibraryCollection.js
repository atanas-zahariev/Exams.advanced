class LibraryCollection {
    constructor(capacity) {
        this.capacity = capacity;
        this.books = [];
    }

    addBook(bookName, bookAuthor) {
        this.capacity--
        if (this.capacity < 0) {
            throw new Error("Not enough space in the collection.");
        }

        this.books.push({
            bookName,
            bookAuthor,
            payed: false
        })

        return `The ${bookName}, with an author ${bookAuthor}, collect.`
    }

    payBook(bookName) {
        let book = this.books.find(b => b.bookName == bookName);

        if (book == undefined) {
            throw new Error(`${bookName} is not in the collection.`)
        } else if (book.payed == true) {
            throw new Error(`${bookName} has already been paid.`)
        } else {
            book.payed = true;
            return `${bookName} has been successfully paid.`
        }
    }

    removeBook(bookName) {
        let book = this.books.find(b => b.bookName == bookName);

        if(book == undefined){
            throw new Error("The book, you're looking for, is not found.")
        }else if(book.payed == false){
            throw new Error(`${bookName} need to be paid before removing from the collection.`)
        }else{
            let index = this.books.indexOf(book);
            this.books.splice(index, 1);
            return `${bookName} remove from the collection.`
        }
    }

    getStatistics(bookAuthor){
        if(bookAuthor == undefined){
            let report = [`The book collection has ${this.capacity} empty spots left.`];

            this.books.sort((a, b) => a.bookName.localeCompare(b.bookName));

            this.books.forEach(book => {
                let payed = book.payed;
                if(payed){
                    report.push(`${book.bookName} == ${book.bookAuthor} - Has Paid.`)
                }else{
                    report.push(`${book.bookName} == ${book.bookAuthor} - Not Paid.`)
                }
            })

            return report.join('\n');
        }else{
            let book = this.books.find(b => b.bookAuthor == bookAuthor)
            if(book){
                let isPayed = book.payed;
                if(isPayed){
                    return `${book.bookName} == ${book.bookAuthor} - Has Paid.`
                }else{
                    return `${book.bookName} == ${book.bookAuthor} - Not Paid.`                   
                }
            }else{
                throw new Error(`${bookAuthor} is not in the collection.`)
            }
        }
    }
}

const library = new LibraryCollection(5)
library.addBook('Don Quixote', 'Miguel de Cervantes');
library.payBook('Don Quixote');
library.addBook('In Search of Lost Time', 'Marcel Proust');
library.addBook('Ulysses', 'James Joyce');
console.log(library.getStatistics('Marcel Proust'));