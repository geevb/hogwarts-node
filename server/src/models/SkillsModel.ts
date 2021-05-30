import PostgresDbConnectionProvider from './postgresDbConnectionProvider';

interface ISubjectSkillLevel {
    id: number;
    title: string;
    level: number;
    name: string;
}

export class SkillsModel {
    private readonly dbProvider;
    constructor() {
        this.dbProvider = PostgresDbConnectionProvider;
    }

    public async getStudentsSkills(studentId: number) {
        const skills: ISubjectSkillLevel[] = await this.dbProvider.any(`
            SELECT skills.id, skills.title, ss.level, s.name FROM skills
            JOIN subjects s on s.id = skills.subject_id
            JOIN student_skills ss on skills.id = ss.skill_id
            WHERE student_id = ${studentId};
        `);

        return skills;
    }


}