import joi from 'joi';

export const creatreUserSchema = joi.object({
    username: joi.string().min(3).max(30).required().alphanum(),
    password: joi.string().required(),
 });

 //paginacion 
export const userPaginationSchema = joi.object({
  page: joi.number().integer().min(1).default(1),
  limit: joi.number().valid(5, 10, 15, 20).default(10),
  search: joi.string().allow('', null).optional(),
  orderBy: joi.string().valid('id', 'username', 'status').default('id'),
  orderDir: joi.string().valid('ASC', 'DESC').default('DESC')
});
