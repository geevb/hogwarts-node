import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

export class PostgresDbConnectionProvider {
    db
    constructor() {
        const initOptions = {
            connect() { console.log('Postgres connection initiated') },
            error(err) {
                console.error('PostgreSQL error', { error: err, callstack: new Error().stack });
            },
        };

        // const config = {
        //     host: process.env.POSTGRES_HOST,
        //     port: process.env.POSTGRES_PORT,
        //     database: process.env.POSTGRES_DB,
        //     user: process.env.POSTGRES_USER,
        //     password: process.env.POSTGRES_PASSWORD,
        //     max: 30
        // };

        const config = {
            host: 'localhost',
            port: 5432,
            database: 'sora-dev',
            user: 'postgres',
            password: 'postgres',
            max: 30
        };

        console.log(config);

        const pgp = pgPromise(initOptions);
        this.db = pgp(config);
    }

    end() {
        this.db.end();
    }
}
