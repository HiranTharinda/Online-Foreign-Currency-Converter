const axios = require("axios");
const RedisService = require('../service_rediscache/redisService');

class ConversionService {
    async convertCurrency(data) {
        try {
            const response = await this.convertFromFixer(data.from, data.to);
            if (response) {
                return response;
            }
        } catch (e) {
            console.log('conversionService.convertCurrency ' + e);
            return 'server_error';
        }
    }

    async convertFromFixer(from, to) {
        try {
            let response = null;
            //check whether redis is on
            if (process.env.REDIS_STATUS === 'on') {
                //check whether praviously cached records for this currency pair
                const currentTime = new Date().getTime()
                response = await RedisService.hget(
                    'exchange_rates',
                    `rate_${from}_${to}`
                );
                if (!response) {
                    //If this currency pair is not in cache the call the api, get the data, cache it.
                    response = await this.getDataFromFixer(from, to);
                    if (response && response != 'fixer_error' && response.success) {
                        const createdTime = new Date().getTime()
                        response.createdTime = createdTime
                        await RedisService.hset(
                            'exchange_rates',
                            `rate_${from}_${to}`,
                            response
                        );
                    }
                } else if (currentTime - response.createdTime > 86400000) {
                    //if the record is avaialable but older than 24hours, then delete the record, call the api and cache it.
                    await RedisService.hdel(
                        'exchange_rates',
                        `rate_${from}_${to}`
                    );
                    response = await this.getDataFromFixer(from, to);
                    if (response && response != 'fixer_error') {
                        const createdTime = new Date().getTime()
                        response.createdTime = createdTime
                        await RedisService.hset(
                            'exchange_rates',
                            `rate_${from}_${to}`,
                            response
                        );
                    }
                }
            } else {
                //if redis is off just use the api.
                response = await this.getDataFromFixer(from, to);
            }
            if (response) {
                return response;
            }
        } catch (e) {
            console.log('conversionService.convertFromFixer ' + e);
        }
    }

    async getDataFromFixer(from, to) {
        const url = `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&base=${from}&symbols=${to}`
        try {
            const response = await axios.get(url)
            return response.data
        } catch (e) {
            console.log('conversionService.getDataFromFixer ' + e);
            return 'fixer_error'
        }
    }
}

module.exports = ConversionService;