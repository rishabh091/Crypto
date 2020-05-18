const avg = require('./avg.js');
const moneyFile = require('../money.js');
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";

async function buy(coins) {
    let money = moneyFile.money;
    console.log("Money Present : " + money);

    for (let i = 0; i < coins.length; i++) {
        if (money != 0) {
            if (coins[i].current_price < avg.avg(coins[i].high_24h, coins[i].low_24h)) {

                const amount = money / 10;

                const reciept = {
                    id: coins[i].id,
                    name: coins[i].name,
                    symbol: coins[i].symbol,
                    price_bought_at: coins[i].current_price,
                    quantity: amount / coins[i].current_price,
                    date: new Date()
                }
                console.log("------------------------------------------------------------------");
                console.log(coins[i].name + " bought at " + coins[i].current_price);
                console.log("Receipt : ", reciept);

                //save reciept in db
                MongoClient.connect(url, (err, db) => {
                    if (err) {
                        console.log("Error in connecting to database, Rolling back");
                        return;
                    }

                    let dbo = db.db('crypto');
                    dbo.collection('receipts').insertOne(reciept, (error, res) => {
                        if (err) {
                            console.log("Error in saving data, Rolling back");
                            return;
                        }

                        //save money back 
                        money -= amount;
                        moneyFile.money = money;

                        console.log("Money left : " + moneyFile.money);
                        db.close();
                    });
                });

                console.log("------------------------------------------------------------------");
            } else {
                console.log(coins[i].name + " is out of budget.");
            }
        } else {
            console.log("Insufficient Funds");
        }
    }
}

module.exports = {
    buy: buy
}