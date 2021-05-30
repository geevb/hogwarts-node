import { Joi, Segments } from 'celebrate';

export const loginSchema = {
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};

export const bestPersonToAskSchema = {
    [Segments.QUERY]: {
        skillId: Joi.number().integer().min(0).required()
    }
};