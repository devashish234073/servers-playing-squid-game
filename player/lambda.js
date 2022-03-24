exports.handler = async (e) => {
    var body = "";
    try {
        body = JSON.parse(e.body);
    } catch (err) {
        let buff = new Buffer.from(e.body,'base64');
        body = JSON.parse(buff.toString('utf8'));
    }
    var event = {};
    var nth = parseInt(body["nth"]);
    const response = {
        statusCode: 200,
        body: nth + "th prime is " + findPrime(nth),
    };
    return response;
};

function findPrime(nth) {//finds nth prime number
    var curr = 2;
    var primeFound = 0;
    while (primeFound < nth) {
        var isPrime = checkIfPrime(curr);
        if (isPrime) {
            primeFound++;
            if (primeFound == nth) {
                return curr;
            }
        }
        curr++;
    }
    return -1;
}

function checkIfPrime(num) {
    if (num == 2) {
        return true;
    }
    var isPrime = true;
    var HALF = parseInt(num / 2);
    for (var i = 2; i <= HALF; i++) {
        if (num % i == 0) {
            isPrime = false;
            break;
        }
    }
    return isPrime;
}