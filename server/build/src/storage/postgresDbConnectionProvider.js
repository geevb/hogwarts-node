"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDbConnectionProvider = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class PostgresDbConnectionProvider {
    constructor() {
        const initOptions = {
            connect() { console.log('Postgres connection initiated'); },
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
        const pgp = pg_promise_1.default(initOptions);
        this.db = pgp(config);
    }
}
exports.PostgresDbConnectionProvider = PostgresDbConnectionProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGdyZXNEYkNvbm5lY3Rpb25Qcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yYWdlL3Bvc3RncmVzRGJDb25uZWN0aW9uUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNERBQW1DO0FBRW5DLG9EQUE0QjtBQUU1QixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE1BQWEsNEJBQTRCO0lBRXJDO1FBQ0ksTUFBTSxXQUFXLEdBQUc7WUFDaEIsT0FBTyxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQSxDQUFDLENBQUM7WUFDMUQsS0FBSyxDQUFDLEdBQVU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNwRixDQUFDO1NBQ0osQ0FBQztRQUVGLG1CQUFtQjtRQUNuQix1Q0FBdUM7UUFDdkMsdUNBQXVDO1FBQ3ZDLHlDQUF5QztRQUN6Qyx1Q0FBdUM7UUFDdkMsK0NBQStDO1FBQy9DLGNBQWM7UUFDZCxLQUFLO1FBRUwsTUFBTSxNQUFNLEdBQUc7WUFDWCxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLElBQUksRUFBRSxVQUFVO1lBQ2hCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLEdBQUcsRUFBRSxFQUFFO1NBQ1YsQ0FBQztRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEIsTUFBTSxHQUFHLEdBQUcsb0JBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0o7QUFqQ0Qsb0VBaUNDIn0=