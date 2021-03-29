const Joi = require('joi');

const schema = Joi.object({
  identificationNumber: Joi.string().min(8).max(9).required(),
  identificationType: Joi.string().required()
});

const defaultValues = {
  business: {
    country: "CL",
    commerce: "Banco"
  }
};

module.exports = { schema, defaultValues };
