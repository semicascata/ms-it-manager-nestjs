import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
} else if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: `${__dirname}.env-prod` });
}

dotenv.config();

export const nodeEnv: string = process.env.NODE_ENV;
export const port: number = +process.env.PORT || +process.env.CUSTOM_PORT;

// typeorm postgre
export const tpType: string = process.env.TYPEORM_TYPE;
export const tpHost: string = process.env.TYPEORM_HOST;
export const tpPort: number = +process.env.TYPEORM_PORT;
export const tpUsername: string = process.env.TYPEORM_USERNAME;
export const tpPassword: string = process.env.TYPEORM_PASSWORD;
export const tpDatabase: string = process.env.TYPEORM_DATABASE;
export const tpUrl: string = process.env.TYPEORM_URL;

// jwt
export const jwtSecret: string = process.env.JWT_SECRET;
export const jwtExpires: number = +process.env.JWT_EXPIRESIN;
export const jwtRefresh: string = process.env.JWT_REFRESH;
export const jwtRefreshExpires: number = +process.env.JWT_REFRESH_EXPIRESIN;

// argon2
export const argonSalt: number = +process.env.SALT;
