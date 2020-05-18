const coins = require('./coins.js');
const getTopCoins = require('./services/getTopCoins.js');
const buy = require('./services/buy.js');

async function main() {
    let data = await coins.coins();
    let arr = getTopCoins.topCoins(data);

    //async buy and sell functions
    //async buy
    buy.buy(arr).catch("Error in buying coins");
}
main();
