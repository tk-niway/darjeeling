import { plainToInstance, } from 'class-transformer';
import { validateSync } from 'class-validator';
import { IConfig } from 'src/config/config.interface';

export function validate(config: Record<string, unknown>): IConfig {
  const validatedConfig = plainToInstance(IConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
