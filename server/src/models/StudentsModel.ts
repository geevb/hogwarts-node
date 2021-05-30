import PostgresDbConnectionProvider from './postgresDbConnectionProvider';
import { IStudentSkills } from '../controllers/StudentsController';

export class StudentsModel {
    private readonly dbProvider;
    constructor() {
        this.dbProvider = PostgresDbConnectionProvider;
    }

    public getStudentsWithSkill = async (studentIdToReceiveHelp: number, skillId: number) => {
        const studentsWithSelectedSkillId: IStudentSkills[] = await this.dbProvider.any(`
            SELECT 
                students.id, 
                students.name, 
                students.house, 
                student_skills.skill_id, 
                student_skills.level
            FROM students
            JOIN student_skills
            ON students.id = student_skills.student_id
            WHERE skill_id = ${skillId};
        `);
    
        return studentsWithSelectedSkillId;
    }

}