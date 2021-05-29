import { Joi, Segments } from 'celebrate';

export const bestPersonToAskSchema = {
    [Segments.QUERY]: {
        skillId: Joi.number().integer().min(0).required()
    }
};