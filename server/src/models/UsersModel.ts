import PostgresDbConnectionProvider from './postgresDbConnectionProvider';
import { StudentsModel, IStudentModel } from './StudentsModel';

interface IUserModel {
    user_id: number;
    email: string;
    password: string;
    role: string;
    created_at: Date;
};

interface IUserStudent extends IUserModel, IStudentModel {};

export class UsersModel {
    private readonly dbProvider;
    constructor() {
        this.dbProvider = PostgresDbConnectionProvider;
    }

    public async getUserByEmail(email: string): Promise<IUserModel | null> {
        try {
            return await this.dbProvider.one(`
                SELECT 
                    id as user_id,
                    email,
                    password,
                    role,
                    created_at
                FROM Users WHERE email = $1
            `, email) as IUserModel;
        } catch (error) {
            return null;
        }
    }

    public async getUserById(userId: number): Promise<IUserStudent | null> {
        try {
            const user =  await this.dbProvider.one(`
                SELECT 
                    id as user_id,
                    email,
                    password,
                    role,
                    created_at
                FROM Users WHERE id = $1
            `, userId) as IUserModel;

            if (user.role === 'student') {
                const studentModel = new StudentsModel();
                const student = await studentModel.getStudentByUserId(user.user_id);
                if (!student) return null;

                return { ...user, ...student } as IUserStudent;
            }
            
            return null;
        } catch (error) {
            return null;
        }
    }

}