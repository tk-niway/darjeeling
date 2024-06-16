import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DB_PORT: Joi.number().default(3306),
  DB_HOST: Joi.string().default('localhost'),
  DB_USERNAME: Joi.string().default('user'),
  DB_PASSWORD: Joi.string().default('password'),
  DB_NAME: Joi.string().default('test'),
  DB_PROVIDER: Joi.string().default('mysql'),
  AUTH0_AUDIENCE: Joi.string().default('api.example.com'),
  AUTH0_ISSUER: Joi.string().default('example.auth0.com/'),
  PUBLIC_FILE_DIR: Joi.string().default('storage/public'),
  PUBLIC_FILES_PREFIX: Joi.string().default('/files'),
  PRIVATE_FILE_DIR: Joi.string().default('storage/private'),
});
