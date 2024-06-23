import { join } from 'path';
import { IConfig } from 'src/config/config.interface';

export function config(): IConfig {
  const testing = process.env.NODE_ENV !== 'production';
  const publicFilesPrefix = 'files';

  return {
    testing,
    port: parseInt(process.env.PORT, 10) || 3000,
    backendUrl: process.env.BACKEND_URL || 'http://localhost:3333/',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000/',
    videoUrl: process.env.VIDEO_URL || 'http://localhost:3333/videos/',
    fileUrl:
      process.env.FILE_URL ||
      'http://localhost:3333/' + publicFilesPrefix + '/',
    db: {
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'test',
      provider: process.env.DB_PROVIDER || 'mysql',
    },
    auth0: {
      audience: process.env.AUTH0_AUDIENCE || 'api.example.com',
      issuer: process.env.AUTH0_ISSUER || 'example.auth0.com/',
    },
    publicDirPrefix: '/' + publicFilesPrefix,
    publicDirPath: join(process.cwd(), 'storage', 'public'),
    videosDirPath: join(process.cwd(), 'storage', 'videos'),
  };
}
