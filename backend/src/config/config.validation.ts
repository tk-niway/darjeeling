import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number(),
  BACKEND_URL: Joi.string(),
  FRONTEND_URL: Joi.string(),
  VIDEO_URL: Joi.string(),
  FILE_URL: Joi.string(),
  DB_PORT: Joi.number(),
  DB_HOST: Joi.string(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_NAME: Joi.string(),
  DB_PROVIDER: Joi.string(),
  AUTH0_AUDIENCE: Joi.string(),
  AUTH0_ISSUER: Joi.string(),
  PUBLIC_DIR_PREFIX: Joi.string(),
  PUBLIC_DIR_PATH: Joi.string(),
  VIDEOS_DIR_PATH: Joi.string(),
});
