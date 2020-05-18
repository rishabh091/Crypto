function getTopCoins(data) {
    let arr = [];
    for(let i = 0; i < 10; i++) {
        arr.push(data[i]);
    }

    return arr;
}

module.exports = {
    topCoins: getTopCoins
}