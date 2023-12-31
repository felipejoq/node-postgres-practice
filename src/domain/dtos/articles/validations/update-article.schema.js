import Joi from 'joi';

export const updateArticleSchema = Joi.object({
  articleId: Joi
    .number()
    .required()
    .min(1)
    .error(new Error('El id es requerida y debe ser un número entero positivo')),
  title: Joi
    .string()
    .min(10)
    .required()
    .error(new Error('El título es requerido y debe tener mínimo 10 carácteres')),
  description: Joi
    .string()
    .min(30)
    .required()
    .error(new Error('La descripción es requerida y debe tener mínimo 30 carácteres')),
  price: Joi
    .number()
    .min(1)
    .required()
    .error(new Error('El precio es requerido y debe ser un número entero positivo')),
  active: Joi
    .boolean()
    .optional(),
  user: Joi
    .required()
    .error(new Error('El usuario es requerido'))
});