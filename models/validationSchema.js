const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().min(6).required()
});


module.exports = {authSchema}