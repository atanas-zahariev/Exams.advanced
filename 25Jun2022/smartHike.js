class SmartHike{
    constructor(username){
        this.username = username;
        this.goals = {};
        this.listOfHikes = [];
        this.resources = 100;
    }

    addGoal (peak, altitude){
        if(this.goals.hasOwnProperty(peak)){
            return `${peak} has already been added to your goals`
        }else{
            this.goals[peak] = altitude;
            return `You have successfully added a new goal - ${peak}`
        }
    }

    hike (peak, time, difficultyLevel){
        let isExist = Object.keys(this.goals).some(p => p === peak);

        if(!isExist){
            throw new Error(`${peak} is not in your current goals`);
        }

        if(isExist){
            if(this.resources === 0){
                throw new Error("You don't have enough resources to start the hike");
            }
        }

        let difference = this.resources - (time * 10);

        if(difference < 0){
            return "You don't have enough resources to complete the hike";
        }else{
            this.resources -= time * 10;
            this.listOfHikes.push({peak,time,difficultyLevel});
            return `You hiked ${peak} peak for ${time} hours and you have ${difference}% resources left`
        }
    }

    rest (time){
        let recover = time * 10;
        let resourcesAfterRecover = this.resources + recover;

        if(resourcesAfterRecover >= 100){
            this.resources = 100;
            return `Your resources are fully recharged. Time for hiking!`
        }else{
            this.resources += recover;
            return `You have rested for ${time} hours and gained ${time*10}% resources`
        }
    }

    showRecord (criteria){
        if(this.listOfHikes.length === 0){
            return `${this.username} has not done any hiking yet`
        }

        if(criteria == 'easy' || criteria == 'hard'){
            let itHasCriteria = this.listOfHikes.some(x => x.difficultyLevel == criteria);
            if(itHasCriteria){
                let timeFilter = this.listOfHikes.filter(x => x.difficultyLevel == criteria).sort((a, b) => a.time - b.time)[0];
                return `${this.username}'s best ${criteria} hike is ${timeFilter.peak} peak, for ${timeFilter.time} hours`
            }else{
                return `${this.username} has not done any ${criteria} hiking yet`
            }
        }else if(criteria == 'all'){
            let result = ["All hiking records:"]

            this.listOfHikes.forEach((user) =>{
                result.push(`${this.username} hiked ${user.peak} for ${user.time} hours`)
            })

            return result.join('\n')
        }
    }
}

const user = new SmartHike('Vili');
user.addGoal('Musala', 2925);
user.hike('Musala', 8, 'hard');
console.log(user.showRecord('easy'));
user.addGoal('Vihren', 2914);
user.hike('Vihren', 4, 'hard');
console.log(user.showRecord('hard'));
user.addGoal('Rui', 1706);
user.hike('Rui', 3, 'easy');
console.log(user.showRecord('all'));