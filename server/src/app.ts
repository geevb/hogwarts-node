import bodyParser from 'body-parser';
import express from 'express';
import { Server } from 'http';
import { setupEndpoints } from './endpoints';
import { PostgresDbConnectionProvider } from './storage/postgresDbConnectionProvider'

export class Application {
    public express: express.Express;
    public readonly dbProvider;
    private server: Server | undefined;

    constructor() {
        this.dbProvider = new PostgresDbConnectionProvider();
        this.express = express();
        this.express.use(express.json({ limit: '2mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(bodyParser.json());
        setupEndpoints(this);
    }

    public start(): void {
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
}


