class SummerCamp{
    constructor( organizer,location){
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = {"child": 150, "student": 300, "collegian": 500};
        this.listOfParticipants = [];
    }

    registerParticipant (name, condition, money){
        if(!this.priceForTheCamp.hasOwnProperty(condition)){
            throw new Error('Unsuccessful registration at the camp.')
        }

        let targetName = this.listOfParticipants.find(p => p.name == name);
        if(targetName){
            return `The ${name} is already registered at the camp.`
        }

        if(this.priceForTheCamp[condition] > money){
            return `The money is not enough to pay the stay at the camp.`;
        }

        this.listOfParticipants.push({
            name,
            condition,
            power: 100,
            wins: 0
        })

        return `The ${name} was successfully registered.`
    }

    unregisterParticipant (name){
        let target = this.listOfParticipants.find(p => p.name == name);
        if(!target){
            throw new Error(`The ${name} is not registered in the camp.`)
        }

        let index = this.listOfParticipants.indexOf(target);
        this.listOfParticipants.splice(index,1);
        return `The ${name} removed successfully.`
    }

    timeToPlay (typeOfGame, participant1, participant2){
        if(typeOfGame == 'WaterBalloonFights'){
            let firstPlayer = this.listOfParticipants.find(p => p.name == participant1);
            let secondPlayer = this.listOfParticipants.find(p => p.name == participant2);

            if(firstPlayer == undefined || secondPlayer == undefined){
                throw new Error(`Invalid entered name/s.`)
            }
            if(firstPlayer.condition !== secondPlayer.condition){
                throw new Error(`Choose players with equal condition.`)
            }

            let firstPlayerPower = firstPlayer.power;
            let secondPlayerPower = secondPlayer.power;

            if(firstPlayerPower > secondPlayerPower){
                firstPlayer.wins++
                return `The ${firstPlayer.name} is winner in the game WaterBalloonFights.`
            }else if(secondPlayerPower > firstPlayerPower){
                secondPlayer.wins++
                return `The ${secondPlayer.name} is winner in the game WaterBalloonFights.`
            }else{
                return `There is no winner.`
            }
        }else{
            let targetPlayer = this.listOfParticipants.find(p => p.name == participant1);
            if(targetPlayer == undefined){
                throw new Error(`Invalid entered name/s.`)
            }

            targetPlayer.power += 20;

            return `The ${targetPlayer.name} successfully completed the game Battleship.`
        }
    }

    toString () {
        let toPrint = [`${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}`];

        this.listOfParticipants.sort((a, b) => b.wins - a.wins).forEach(p => {
            toPrint.push(`${p.name} - ${p.condition} - ${p.power} - ${p.wins}`)
        })

        return toPrint.join('\n')
    }
}

const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
console.log(summerCamp.unregisterParticipant("Sara Dickinson"));

//console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));
console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
console.log(summerCamp.timeToPlay("Battleship", "Dimitur Kostov"));

console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));

console.log(summerCamp.toString());