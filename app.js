const coins = require('./coins.js');
const getTopCoins = require('./services/getTopCoins.js');

async function main() {
    let data = await coins.coins();
    let arr = getTopCoins.topCoins(data);

    //async buy and sell functions
}
main();
