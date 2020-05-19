const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://127.0.0.1:27017/";

//update moneny
function saveMoney(money) {
    MongoClient.connect(url, (err, db) => {
        if(err) {
            console.log('Error connecting to Money Collection');
            return;
        }
        
        let dbo = db.db('crypto');
        let query = { name: "Rishabh" };
        let newValue = { $set: {money: money}};

        dbo.collection('money').updateOne(query, newValue, (err, res) => {
            if(err) {
                console.log('Error in updating money database');
                return;
            }

            db.close();
        });
    });
}

//get money
function getMoney() {
    return new Promise((resolve, reject) => {

        MongoClient.connect(url, (err, db) => {
            if(err) {
                console.log('Error in connecting money db');
                reject(err);
            }

            let dbo = db.db('crypto');
            dbo.collection('money').findOne({name: 'Rishabh'}, (err, result) => {
                if(err) {
                    console.log('Error in getting money');
                    reject(err);
                }

                resolve(result.money);
                db.close();
            });
        });
    });
}

module.exports = {
    save: saveMoney,
    get: getMoney
}