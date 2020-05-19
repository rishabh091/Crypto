const coins = require('./coins.js');
const getTopCoins = require('./services/getTopCoins.js');
const buy = require('./services/buy.js');
const sell = require('./services/sell.js');

async function algorithm() {
    let data = await coins.coins();
    let arr = getTopCoins.topCoins(data);

    //async buy and sell functions
    //async buy
    buy.buy(arr).catch((err) => { console.log('Error in buying coins') });
    //async sell
    sell.sell().catch((err) => { console.log("Error in selling coins") });
}

function main() {
    let interval = setInterval(() => {
        algorithm();
    }, 60 * 1000);
}
main();
