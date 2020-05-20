const MongoClient = require('mongodb').MongoClient;
const moneyFile = require('../money.js');
const coins = require('../coins.js');

const url = "mongodb://localhost:27017/";

async function sell() {
    const receipts = await getReceipts().catch((err) => { return; });

    if(receipts.length == 0) {
        console.log('No coins to sell');
        return;
    }
    
    for(let i = 0; i < receipts.length; i++) {
        let reciept_coin = receipts[i];
        let current_coin = await coins.getCoin(reciept_coin.id).catch((err) => {
            console.log("Cannot find coin named " + reciept_coin.id);
            return;
        });

        let money = await moneyFile.get().catch((err) => { return; });
        const profit = reciept_coin.quantity * current_coin.market_data.current_price.inr;
        
        //add profit
        money += profit;

        if(current_coin.market_data.current_price.inr > reciept_coin.price_bought_at) {
            MongoClient.connect(url, (err, db) => {
                if(err) {
                    console.log('Error in getting db of receipts');
                    return;
                }

                let dbo = db.db('crypto');
                const filter = {
                    id: reciept_coin.id
                }

                dbo.collection('receipts').deleteOne(filter, (err, result) => {
                    if(err) {
                        console.log('Error in selling ' + reciept_coin.id);
                        return;
                    }

                    //save money in db
                    if(money === NaN || money === undefined) {
                        return;
                    }
                    moneyFile.save(money);

                    console.log(reciept_coin.id + " quantity : " + reciept_coin.quantity);
                    console.log(reciept_coin.id + " sold at " + current_coin.market_data.current_price.inr);
                    console.log('Profit : ' + profit);
                    db.close();
                });
            });            
        }
        else{
            console.log("Not ideal time to sell " + reciept_coin.id);
        }
    }
}

function getReceipts() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if(err) {
                console.log("Error in getting receipts");
                reject(err);
            }

            let dbo = db.db('crypto');
            dbo.collection('receipts').find({}).toArray((err, result) => {
                if(err) {
                    console.log('Error in getting receipts');
                    reject(err);
                }

                resolve(result);
                db.close();
            });
        });
    });
}

module.exports = {
    sell: sell
}