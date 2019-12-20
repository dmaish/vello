import firebaseObj from './../firebase';


class Services {
    static async getFoodService(){
        let food;
        food = await firebaseObj.database().ref('/data').once('value').then(function async(snapshot){
            return snapshot.val();
        });
        return food;
    }

    static async getAllOrdersService(){
        let food;
        food = await firebaseObj.database().ref('/orders').once('value').then(function async(snapshot){
            return snapshot.val();
        });
        return food;
    }

}

export default Services;