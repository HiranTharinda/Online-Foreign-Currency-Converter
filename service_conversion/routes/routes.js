module.exports = app => {
    const controller = require("../constrollers/controller");
    var router = require("express").Router();
    router.post("/", controller.convert);
    app.use('/convert', router);
};