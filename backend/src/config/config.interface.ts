import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';

export class IConfig {
  @IsNotEmpty()
  testing: boolean;

  @IsNotEmpty()
  port: number;

  @IsNotEmpty()
  @IsNotEmptyObject()
  db: {
    port: number;
    host: string;
    username: string;
    password: string;
    database: string;
    provider: string;
  };

  @IsNotEmpty()
  @IsNotEmptyObject()
  auth0: {
    audience: string;
    issuer: string;
  };

  @IsNotEmpty()
  @IsNotEmptyObject()
  filepath: {
    publicFiles: string;
    publicFilesPrefix: string;
  };
}
