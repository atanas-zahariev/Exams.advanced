const { expect } = require('chai');

const companyAdministration = {

    hiringEmployee(name, position, yearsExperience) {
        if (position == "Programmer") {
            if (yearsExperience >= 3) {
                return `${name} was successfully hired for the position ${position}.`;
            } else {
                return `${name} is not approved for this position.`;
            }
        }
        throw new Error(`We are not looking for workers for this position.`);
    },
    calculateSalary(hours) {

        let payPerHour = 15;
        let totalAmount = payPerHour * hours;

        if (typeof hours !== "number" || hours < 0) {
            throw new Error("Invalid hours");
        } else if (hours > 160) {
            totalAmount += 1000;
        }
        return totalAmount;
    },
    firedEmployee(employees, index) {

        let result = [];

        if (!Array.isArray(employees) || !Number.isInteger(index) || index < 0 || index >= employees.length) {
            throw new Error("Invalid input");
        }
        for (let i = 0; i < employees.length; i++) {
            if (i !== index) {
                result.push(employees[i]);
            }
        }
        return result.join(", ");
    }

}

describe('test', () => {
    it('testing first function', () => {
        expect(() => companyAdministration.hiringEmployee('Pesho', 'Director', 2)).to.throw(Error);
        expect(() => companyAdministration.hiringEmployee('Pesho', ['Director'], 4)).to.throw(Error);
        expect(() => companyAdministration.hiringEmployee('Pesho', 'Director', 4)).to.throw(Error);
        expect(() => companyAdministration.hiringEmployee('Pesho', {}, 4)).to.throw(Error);
        expect(() => companyAdministration.hiringEmployee('Pesho', 4, 4)).to.throw(Error);

        expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 3)).to.equal(`Pesho was successfully hired for the position Programmer.`);
        expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 20)).to.equal(`Pesho was successfully hired for the position Programmer.`);

        expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 2.99)).to.equal(`Pesho is not approved for this position.`);
        expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 0)).to.equal(`Pesho is not approved for this position.`);
    })
    it('testing second function', () => {
        expect(() => companyAdministration.calculateSalary('2')).to.throw(Error);
        expect(() => companyAdministration.calculateSalary(['2'])).to.throw(Error);
        expect(() => companyAdministration.calculateSalary({})).to.throw(Error);
        expect(() => companyAdministration.calculateSalary(-2)).to.throw(Error);

        expect(companyAdministration.calculateSalary(8)).to.equal(120)
        expect(companyAdministration.calculateSalary(0)).to.equal(0)
        expect(companyAdministration.calculateSalary(200)).to.equal(4000);
        expect(companyAdministration.calculateSalary(160)).to.equal(2400)
    })
    it('testing third function', () => {
        expect(() => companyAdministration.firedEmployee('2', 1)).to.throw(Error);
        expect(() => companyAdministration.firedEmployee(2, 1)).to.throw(Error);
        expect(() => companyAdministration.firedEmployee({}, 1)).to.throw(Error);

        expect(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"],2.1)).to.throw(Error);
        expect(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"],[2.1])).to.throw(Error);
        expect(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"],{})).to.throw(Error);
        
        expect(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"],-1)).to.throw(Error);
        expect(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"],3)).to.throw(Error);
        expect(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"],'2')).to.throw(Error);


       expect(companyAdministration.firedEmployee(["Petar", "Ivan", "George"],1)).to.equal(`Petar, George`)
    })
})