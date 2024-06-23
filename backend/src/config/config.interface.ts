export interface IConfig {
  testing: boolean;
  port: number;
  backendUrl: string;
  frontendUrl: string;
  videoUrl: string;
  fileUrl: string;
  db: {
    port: number;
    host: string;
    username: string;
    password: string;
    database: string;
    provider: string;
  };
  auth0: {
    audience: string;
    issuer: string;
  };
  publicDirPrefix: string;
  publicDirPath: string;
  videosDirPath: string;
}
