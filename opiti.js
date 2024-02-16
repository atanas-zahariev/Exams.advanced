// const obj = {
//     name: 'Peter',
//     outer(){
//         console.log(this);
//         function inner(){
//             console.log(this);
//         }
//         inner()
//     }
// }

// obj.outer()


// function Foo(who) {

//     this.me = who;

// }

// Foo.prototype.identify = function () { return "I am " + this.me; }

// function Bar(who) { Foo.call(this, who); }


// Bar.prototype = Object.create(Foo.prototype);

// Bar.prototype.speak = function () {

//     console.log("Hello, " + this.identify() + ".");

// }

// let b1 = new Bar("b1");

// let b2 = new Bar("b2");

// b1.speak(); b2.speak();


// const objs = [

// 	       {name: 'Peter',age:35 }, 

//               { age: 22 },

//               {name: "Steven"}, 

//               {height:180}

// ];

// const concatenate = (a, o) => ({...a, ...o});

// const c = objs.reduce(concatenate, {});

// //console.log(c);// { name: 'Steven', age: 22, height: 180 }

// let a = objs[0]
// let v = objs[1]
// let h = Object.assign(a,v)
// console.log(h);

// function partsToBuy(partsCatalog, neededParts) {
//     let totalSum = 0;

//     if (!Array.isArray(partsCatalog) || !Array.isArray(neededParts)) {
//         throw new Error("Invalid input");
//     }
//     neededParts.forEach((neededPart) => {
//         partsCatalog.map((obj) => {
//             if (obj.part === neededPart) {
//                 totalSum += obj.price;
//             }
//         });
//     });

//     return totalSum;
// }

// console.log(partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }],["blowoff valve", "injectors" ]));

// let arr = [{name:'nasko',age:48},{name:'aleksandra',age:45}]

// let sorted = arr.sort((a, b) => a.name.localeCompare(b.name)).map(el =>  el.name);
// console.log(sorted);

//  function suitableTitles(array, wantedGenre) {
//     let resultArr = [];

//     if (!Array.isArray(array) || typeof wantedGenre !== "string") {
//       throw new Error("Invalid input");
//     }
//     array.map((obj) => {
//       if (obj.genre === wantedGenre) {
//         resultArr.push(obj.title);
//       }
//     });
//     return resultArr;
//   }

//     console.log(suitableTitles([{ title: "The Da Vinci Code", genre: "Thriller" }],"Thriller"));


// function createElement(type,arr,text){
//     let element = document.createElement(type)
//     if(arr !== undefined){
//       arr.forEach(obj =>{
//         let {attribute , value} = obj;
//       element.setAttribute(attribute,value)
//       })
//     }
//     if(text !== undefined){
//         element.textContent = text;
//     }
//     return element;
// }

// console.log();

// let a = 100.5;
// console.log(Number.isInteger(a));

// function  calculatePriceOfCar(model, days) {
//     let catalogue = {
//         Volkswagen: 20,
//         Audi: 36,
//         Toyota: 40,
//         BMW: 45,
//         Mercedes: 50
//     };

//     if (typeof model == 'string' && Number.isInteger(days)) {
//         if (catalogue.hasOwnProperty(model)) {
//             let cost = catalogue[model] * days;
//             return `You choose ${model} and it will cost $${cost}!`
//         } else {
//             throw new Error('No such model in the catalog!')
//         }
//     } else {
//         throw new Error('Invalid input!')
//     }
// }

// console.log(calculatePriceOfCar('Volkswagen',-1));

// function sellFlowers(gardenArr, space) {
//     let shop = [];
//     let i = 0;
//     if (!Array.isArray(gardenArr) || !Number.isInteger(space) || space < 0 || space >= gardenArr.length) {
//         throw new Error('Invalid input!');
//     } else {
//         while (gardenArr.length > i) {
//             if (i != space) {
//                 shop.push(gardenArr[i]);
//             }
//             i++
//         }
//     }
//     return shop.join(' / ');
// }

// console.log(sellFlowers(["Rose", "Lily", "Orchid"],0));

// function firedEmployee(employees, index) {

//     let result = [];

//     if (!Array.isArray(employees) || !Number.isInteger(index) || index < 0 || index >= employees.length) {
//         throw new Error("Invalid input");
//     }
//     for (let i = 0; i < employees.length; i++) {
//         if (i !== index) {
//             result.push(employees[i]);
//         }
//     }
//     return result.join(", ");
// }

// console.log(firedEmployee(["Petar", "Ivan", "George"],1));

function isLargeEnough(apartments, minimalSquareMeters) {
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
  }

  console.log(isLargeEnough([40, 50, 60],60));