import Joi from 'joi';
// let { title, description, price, active, user, files } = body;

export const createArticleSchema = Joi.object({
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
    .error(new Error('El usuario es requerido')),
  files: Joi
    .array()
    .required()
    .error(new Error('Las imágenes son requeridos'))
});