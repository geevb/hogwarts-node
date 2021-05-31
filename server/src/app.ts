import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import { setupEndpoints } from './controllers/endpoints';
import { errors } from 'celebrate';

export class Application {
    public express: express.Express;
    private server: Server | undefined;
    constructor() {
        this.express = express();
        this.express.use(express.json({ limit: '2mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(bodyParser.json());
        this.express.use(helmet());
        
        setupEndpoints(this);
        this.express.use(errors());
    }

    public start(): void {
        try {
            this.server = this.express.listen(5000, () => {
                console.log(`Start app and listen on port ${5000}.`);
            });
        } catch (error) {
            console.log(error);
        }
    }
}


