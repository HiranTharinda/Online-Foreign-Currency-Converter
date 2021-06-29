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
            if (process.env.REDIS_STATUS === 'on') {
                const currentTime = new Date().getTime()
                response = await RedisService.hget(
                    'exchange_rates',
                    `rate_${from}_${to}`
                );
                if (!response) {
                    response = await this.getDataFromFixer(from, to);
                    if (response && response !== 'fixer_error' && response.success) {
                        await RedisService.hset(
                            'exchange_rates',
                            `rate_${from}_${to}`,
                            response
                        );
                    }
                } else if (currentTime / 1000 - response.timestamp > 86400) {
                    await RedisService.hdel(
                        'exchange_rates',
                        `rate_${from}_${to}`
                    );
                    response = await this.getDataFromFixer(from, to);
                    if (response && response !== 'fixer_error') {
                        await RedisService.hset(
                            'exchange_rates',
                            `rate_${from}_${to}`,
                            response
                        );
                    }
                }
            } else {
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