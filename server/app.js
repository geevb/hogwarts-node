import bodyParser from 'body-parser';
import express from 'express';
import { setupEndpoints } from './endpoints.js';
import { PostgresDbConnectionProvider } from './storage/postgresDbConnectionProvider.js'

export class Application {
    express;
    dbProvider;
    dbLogger;
    appLogger;
    server;
    httpTerminator;

    constructor() {
        this.dbProvider = new PostgresDbConnectionProvider();
        this.express = express();
        this.express.use(express.json({ limit: '2mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(bodyParser.json());
        setupEndpoints(this);
    }

    start() {
        this.server = this.express.listen(5000, () => {
            console.log(`Start app and listen on port ${5000}.`);
        });

        // const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
        // signals.forEach(sig => {
        //     process.on(sig, async () => {
        //         this.appLogger.info(`Received signal ${sig}. Shutdown application`);

        //         if (this.params && this.params.onProcessShutdown) {
        //             try {
        //                 this.appLogger.info('Call onProcessShutdown function');
        //                 await this.params.onProcessShutdown(this.appLogger);
        //             } catch (error) {
        //                 this.appLogger.error('Error occurred executing shutdown handled', error);
        //             }
        //         }
        //         this.shutdown().then(() => {
        //             this.appLogger.info('Shutdown completed');
        //             process.exit(0);
        //         });
        //     });
        // });
    }

    async stop() {
        await this.shutdown();
    }

    async shutdown() {
        // this.appLogger.info(`Shutdown application...`);
        // if (this.server && this.httpTerminator) {
        //     this.appLogger.info('Shutdown HTTP server...');
        //     await this.httpTerminator.terminate();
        //     this.appLogger.info(`HTTP server has been successfully closed`);
        // } else {
        //     this.appLogger.info('HTTP server was not started');
        // }

        // this.appLogger.info('Shutdown connections to the database...');
        // this.dbProvider.end();
        // this.appLogger.info('Shutdown connections to the database...OK');

        // this.appLogger.info(`Application has been gracefully terminated`);
    }
}


