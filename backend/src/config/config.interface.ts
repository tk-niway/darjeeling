export interface IConfig {
  testing: boolean;
  port: number;
  frontendUrl: string;
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
  filepath: {
    publicFileDir: string;
    publicFilesPrefix: string;
    privateFileDir: string;
  };
}
