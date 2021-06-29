const asyncRedis = require('async-redis');
let client = null;

if (process.env.REDIS_STATUS === 'on') {
    client = asyncRedis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
    client.on('error', function (err) {
        console.log(err);
    });
}

module.exports = client;
