import 'dotenv/config';

export const ENV = {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    PORT: Number(process.env.PORT ?? 4000),
    DB_SQLITE_PATH: process.env.DB_SQLITE_PATH ?? './data/dev.sqlite',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? 'dev-access-secret',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret',
    ACCESS_TTL_MINUTES: Number(process.env.ACCESS_TTL_MINUTES ?? 15),
    REFRESH_TTL_DAYS: Number(process.env.REFRESH_TTL_DAYS ?? 30),
};
