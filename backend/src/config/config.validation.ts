import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number(),
  FRONTEND_URL: Joi.string(),
  DB_PORT: Joi.number(),
  DB_HOST: Joi.string(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_NAME: Joi.string(),
  DB_PROVIDER: Joi.string(),
  AUTH0_AUDIENCE: Joi.string(),
  AUTH0_ISSUER: Joi.string(),
  PUBLIC_FILE_DIR: Joi.string(),
  PUBLIC_FILES_PREFIX: Joi.string(),
  PRIVATE_FILE_DIR: Joi.string(),
});
