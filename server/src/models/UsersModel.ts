import PostgresDbConnectionProvider from './postgresDbConnectionProvider';

export class UsersModel {
    private readonly dbProvider;
    constructor() {
        this.dbProvider = PostgresDbConnectionProvider;
    }

    public async findUserEmail(email: string) {
        return await this.dbProvider.one(`
            SELECT * FROM Users WHERE email = ${email}
        `);
    }

}