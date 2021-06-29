const redisClient = require('./redisConfig');

class RedisService {

    // Set the field, value to the hash stored at key
    static async hset(key, field, value) {
        const data = JSON.stringify(value);
        await redisClient.hset(key, field, data);
    }

    // Get the specified field from the hash stored at key
    static async hget(key, field) {
        let value = null;
        if (await redisClient.hexists(key, field)) {
            value = await redisClient.hget(key, field);
        }
        return JSON.parse(value);
    }

    // Removes the specified field from the hash stored at key
    static async hdel(key, field) {
        await redisClient.hdel(key, field);
    }
}

module.exports = RedisService;
