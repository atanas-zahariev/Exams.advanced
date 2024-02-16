class ArtGallery {
    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = { "picture": 200, "photo": 50, "item": 250 };
        this.listOfArticles = [];
        this.guests = []
    }

    addArticle(articleModel, articleName, quantity) {
        articleModel = articleModel.toLowerCase();
        if (!this.possibleArticles.hasOwnProperty(articleModel)) {
            throw new Error("This article model is not included in this gallery!");
        }

        let targetModel = this.listOfArticles.find(el => el.articleModel == articleModel)
        let targetName = this.listOfArticles.find(el => el.articleName == articleName);//

        if (targetModel && targetName) {
            targetModel.quantity += quantity
        } else {
            this.listOfArticles.push({
                articleModel,
                articleName,
                quantity
            })
        }

        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`
    }

    inviteGuest(guestName, personality) {
        let targetGuest = this.guests.find(g => g.guestName == guestName);

        if (targetGuest) {
            throw new Error(`${guestName} has already been invited.`)
        }
        let startPoints = 0
        if (personality == 'Vip') {
            startPoints = 500
        } else if (personality == 'Middle') {
            startPoints = 250
        } else {
            startPoints = 50
        }

        this.guests.push({
            guestName,
            points:startPoints,
            purchaseArticle: 0
        })

        return `You have successfully invited ${guestName}!`
    }

    buyArticle ( articleModel, articleName, guestName){
        let targetModel = this.listOfArticles.find(el => el.articleModel == articleModel);

        if(!targetModel){

            throw new Error("This article is not found.")            
        }else if(targetModel.articleName != articleName){

            throw new Error("This article is not found.")
        }else if(targetModel.quantity == 0){

            return `The ${articleName} is not available.`
        }

        let targetGuest = this.guests.find(el => el.guestName == guestName);
        if(!targetGuest){
            return `This guest is not invited.`
        }

        let guestPoints = targetGuest.points;
        let nededPoint = this.possibleArticles[articleModel];

        if(guestPoints >= nededPoint){
            targetGuest.points -= nededPoint;
            targetModel.quantity--
            targetGuest.purchaseArticle++
        }else{
            return `You need to more points to purchase the article.`
        }

        return `${guestName} successfully purchased the article worth ${nededPoint} points.`
        
    }

    showGalleryInfo (criteria){
        let toPrint = []
        if(criteria == 'article'){
            toPrint.push(`Articles information:`)

            this.listOfArticles.forEach(el => {
                toPrint.push(`${el.articleModel} - ${el.articleName} - ${el.quantity}`)
            })

        }else{
            toPrint.push(`Guests information:`)

            this.guests.forEach(el => {
                toPrint.push(`${el.guestName} - ${el.purchaseArticle}`)
            })
        }
        return toPrint.join('\n');        
    }
}

const artGallery = new ArtGallery('Curtis Mayfield'); 
artGallery.addArticle('picture', 'Mona Liza', 3);
artGallery.addArticle('Item', 'Ancient vase', 2);
artGallery.addArticle('picture', 'Mona Liza', 1);
artGallery.inviteGuest('John', 'Vip');
artGallery.inviteGuest('Peter', 'Middle');
artGallery.buyArticle('picture', 'Mona Liza', 'John');
artGallery.buyArticle('item', 'Ancient vase', 'Peter');
console.log(artGallery.showGalleryInfo('article'));
console.log(artGallery.showGalleryInfo('guest'));
