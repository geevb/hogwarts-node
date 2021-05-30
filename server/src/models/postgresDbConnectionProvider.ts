import pgPromise from 'pg-promise';

import dotenv from 'dotenv';
dotenv.config();

interface IPostgresTimeseriesStoreParams {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    ssl?: boolean;
    connectionTimeoutMillis?: number;
}

const initOptions = {
    connect() { console.log('Postgres connection initiated') },
    error(err: Error) {
        console.error('PostgreSQL error', { error: err, callstack: new Error().stack });
    },
};

const config: IPostgresTimeseriesStoreParams = {
    host: 'localhost',
    port: 5432,
    database: 'sora-dev',
    user: 'postgres',
    password: 'postgres'
};

export default pgPromise(initOptions)(config);
