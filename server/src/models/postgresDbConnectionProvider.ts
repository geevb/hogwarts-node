import pgPromise from 'pg-promise';
import { config as loadEnvironmentConfig } from 'dotenv';
loadEnvironmentConfig({ path: `${__dirname}/../../../.env` });

interface IPostgresTimeseriesStoreParams {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    ssl?: boolean;
    connectionTimeoutMillis?: number;
};

const config: IPostgresTimeseriesStoreParams = {
    host: process.env.POSTGRES_HOST as string,
    port: parseInt(`${process.env.POSTGRES_PORT}`, 10) || 5432,
    database: process.env.POSTGRES_DB as string,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string
};

const initOptions = {
    connect() { console.log('Postgres connection initiated') },
    error(err: Error) {
        console.error('PostgreSQL error', { error: err, callstack: new Error().stack });
    },
};

let pgp;
try {
    pgp = pgPromise(initOptions)(config);
} catch (error) {
    console.log(error);
    process.exit(1);
}

export default pgp as pgPromise.IDatabase<any>;
