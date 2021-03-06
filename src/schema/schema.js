const Joi = require('joi');
const { empty } = require('uuidv4');

const schema = {
    imageSchema: Joi.object({
        image: Joi.string().min(0).max(28).required().messages({
            'string.base': `image should be a type of 'jpg'`,
            'string.empty': `image cannot be an empty field`,
            'string.min': `image should have a minimum length of {#limit}`,
            'string.max': `image should have a maximum length of {#limit}`,
            'any.required': `image is a required field`
        })
    }),
    productSchema: Joi.object({
        name: Joi.string().empty("").required().messages({
            'string.base': `name should be a type of 'text'`,
            'string.empty': `name cannot be an empty field`,
            'string.min': `name should have a minimum length of {#limit}`,
            'any.required': `name is a required field`
        }),
        description: Joi.string().empty("").min(10).max(200).required().messages({
            'string.base': `description should be a type of 'text'`,
            'string.empty': `description cannot be an empty field`,
            'string.min': `description should have a minimum length of {#limit}`,
            'string.max': `description should have maximum length of {#limit}`,
            'any.required': `description is a required field`
        }),
        price: Joi.number().empty("").required().messages({
            'number.base': `price should be a type of 'number'`,
            'number.empty': `price cannot be an empty field`,
            'any.required': `price is a required field`
        }),
        image: Joi.string().empty("").required().messages({
            'string.base': `image should be a type of 'text'`,
            'string.empty': `image cannot be an empty field`,
            'string.min': `image should have a minimum length of {#limit}`,
            'any.required': `image is a required field`
        }),
        stock: Joi.number().empty("").required().messages({
            'number.base': `stock should be a type of 'number'`,
            'number.empty': `stock cannot be an empty field`,
            'number.min': `stock should have a minimum length of {#limit}`,
            'any.required': `stock is a required field`
        }),
        id_category: Joi.string().empty("").required().messages({
            'number.base': `category should be a type of 'number'`,
            'number.empty': `category cannot be an empty field`,
            'number.min': `category should have a minimum length of {#limit}`,
            'any.required': `category is a required field`
        })
    })
}



module.exports = schema;