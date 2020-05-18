const unirest = require('unirest');

const url = 'https://coingecko.p.rapidapi.com/coins/markets?vs_currency=inr';
const headers = {
    "x-rapidapi-key": "b219028f08mshb5e9d7c8368d852p12dd2bjsnc6e4552f8f8e",
    "x-rapidapi-host": "coingecko.p.rapidapi.com"
}

//making an req object
var req = unirest("GET", url);
req.headers(headers);

function fetchCoins() {
    return new Promise((resolve, reject) => {
        req.end((res) => {
            if (res.error) {
                reject(res.error);
            }
            resolve(res.body);
        })
    });
}

module.exports = {
    coins: fetchCoins
}