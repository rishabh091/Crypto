const fs = require('fs');
const avg = require('./avg.js');
const moneyFile = require('../money.js');

async function buy(coins) {
    let money = moneyFile.money;
    console.log("Money Present : " + money);

    for(let i = 0; i < coins.length; i++) {
        if(money != 0) {
            if(coins[i].current_price < avg.avg(coins[i].high_24h, coins[i].low_24h)) {

                const amount = money / 10;
                //save money back 
                money -= amount;
                moneyFile.money = money;

                const reciept = {
                    id : coins[i].id,
                    name : coins[i].name,
                    symbol : coins[i].symbol,
                    price_bought_at : coins[i].current_price,
                    quantity : amount / coins[i].current_price,
                    date : new Date()
                }
                console.log("------------------------------------------------------------------");
                console.log(coins[i].name + "bought at " + coins[i].current_price);
                console.log("Receipt : ", reciept);
                console.log("------------------------------------------------------------------");

                //save reciept in db
            }
            else{
                console.log(coins[i].name + " is out of budget.");
            }
        }
        else{
            console.log("Insufficient Funds");
        }
    }
}

module.exports = {
    buy: buy
}