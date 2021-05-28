"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const endpoints_1 = require("./endpoints");
const postgresDbConnectionProvider_1 = require("./storage/postgresDbConnectionProvider");
class Application {
    constructor() {
        this.dbProvider = new postgresDbConnectionProvider_1.PostgresDbConnectionProvider();
        this.express = express_1.default();
        this.express.use(express_1.default.json({ limit: '2mb' }));
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
        this.express.use(body_parser_1.default.json());
        endpoints_1.setupEndpoints(this);
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
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.shutdown();
        });
    }
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.Application = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBcUM7QUFDckMsc0RBQThCO0FBQzlCLDJDQUE2QztBQUM3Qyx5RkFBcUY7QUFFckYsTUFBYSxXQUFXO0lBUXBCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDJEQUE0QixFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEMsMEJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBRUgsb0RBQW9EO1FBQ3BELDJCQUEyQjtRQUMzQixvQ0FBb0M7UUFDcEMsK0VBQStFO1FBRS9FLDhEQUE4RDtRQUM5RCxvQkFBb0I7UUFDcEIsMEVBQTBFO1FBQzFFLHVFQUF1RTtRQUN2RSxnQ0FBZ0M7UUFDaEMsNEZBQTRGO1FBQzVGLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osdUNBQXVDO1FBQ3ZDLHlEQUF5RDtRQUN6RCwrQkFBK0I7UUFDL0IsY0FBYztRQUNkLFVBQVU7UUFDVixNQUFNO0lBQ1YsQ0FBQztJQUVLLElBQUk7O1lBQ04sTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsQ0FBQztLQUFBO0lBRUssUUFBUTs7WUFDVixrREFBa0Q7WUFDbEQsNENBQTRDO1lBQzVDLHNEQUFzRDtZQUN0RCw2Q0FBNkM7WUFDN0MsdUVBQXVFO1lBQ3ZFLFdBQVc7WUFDWCwwREFBMEQ7WUFDMUQsSUFBSTtZQUVKLGtFQUFrRTtZQUNsRSx5QkFBeUI7WUFDekIsb0VBQW9FO1lBRXBFLHFFQUFxRTtRQUN6RSxDQUFDO0tBQUE7Q0FDSjtBQS9ERCxrQ0ErREMifQ==