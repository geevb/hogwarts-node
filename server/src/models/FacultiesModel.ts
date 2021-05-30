import PostgresDbConnectionProvider from './postgresDbConnectionProvider';

interface IFacultyModel {
    name: string;
}

export class FacultiesModel {
    private readonly dbProvider;
    constructor() {
        this.dbProvider = PostgresDbConnectionProvider;
    }

    public getFacultiesWhoTeachesSkill = async (skillId: number): Promise<IFacultyModel[] | null> => {
        const facultiesWithSelectedSkillId: IFacultyModel[] = await this.dbProvider.any(`
            SELECT faculties.name 
            FROM faculties
            JOIN faculty_subjects fs ON faculties.id = fs.faculty_id
            JOIN skills s ON fs.subject_id = s.subject_id
            WHERE s.id = $1;
        `, skillId);
    
        if (facultiesWithSelectedSkillId.length === 0) {
            return null;
        }
    
        return facultiesWithSelectedSkillId;
    }

}