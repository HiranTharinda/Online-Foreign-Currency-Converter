const ConversionService = require('../conversionService');
const Joi = require('@hapi/joi');
const e = require('cors');

module.exports.convert = async function (req, res) {
    const { error } = _validateConvertionData(req.body);
    if (!error) {
        const ConversionServiceInstance = new ConversionService();
        const response = await ConversionServiceInstance.convertCurrency(req.body);
        switch (response) {
            case 'server_error':
                res.status(500);
                res.json({ data: { success: false, msg: 'Something went wrong with the conversion API' } });
                break;
            case 'fixer_error':
                res.status(500);
                res.json({ data: { success: false, msg: 'Something went wrong with the fixer API' } });
                break;
            default:
                res.status(200);
                res.json({ data: response });
                break;
        }
    } else {
        res.status(400);
        res.json({ msg: 'Validation error occurred' });
    }
};


function _validateConvertionData(data) {
    const schema =
        Joi.object({
            from: Joi.string().required(),
            to: Joi.string().required()
        })
    return Joi.validate(data, schema);
}