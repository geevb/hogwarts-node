import PostgresDbConnectionProvider from './postgresDbConnectionProvider';
import { IStudentSkills } from '../controllers/StudentsController';

export interface IStudentModel {
    student_id: number;
    name: string;
    house: string;
    user_id: number;
}

export class StudentsModel {
    private readonly dbProvider;
    constructor() {
        this.dbProvider = PostgresDbConnectionProvider;
    }

    public getStudentsWithSkill = async (skillId: number) => {
        const studentsWithSelectedSkillId: IStudentSkills[] = await this.dbProvider.any(`
            SELECT 
                students.id as student_id, 
                students.name, 
                students.house, 
                student_skills.skill_id, 
                student_skills.level
            FROM students
            JOIN student_skills
            ON students.id = student_skills.student_id
            WHERE skill_id = $1;
        `, skillId);
    
        return studentsWithSelectedSkillId;
    };

    public getStudentByUserId = async (userId: number): Promise<IStudentModel | null> => {
        try {
            return await this.dbProvider.one(`
                SELECT 
                    id as student_id,
                    name,
                    house,
                    user_id
                FROM students
                WHERE user_id = $1;
            `, userId) as IStudentModel;
        } catch (error) {
            return null;
        }
    }

}