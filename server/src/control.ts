import { PostgresDbConnectionProvider } from './storage/postgresDbConnectionProvider'

export interface IStudentSkills {
    id: number;
    name: string;
    house: string;
    level: number;
    skill_id: number;
}

export const getFacultiesWhoTeachesSkill = async (dbProvider: PostgresDbConnectionProvider, skillId: number): Promise<string | null> => {
    const facultiesWithSelectedSkillId: string[] = await dbProvider.db.any(`
        SELECT faculties.name FROM faculties
        JOIN faculty_subjects fs ON faculties.id = fs.faculty_id
        JOIN skills s ON fs.subject_id = s.subject_id
        WHERE s.id = ${skillId};
    `);

    if (facultiesWithSelectedSkillId.length === 0) {
        return null;
    }

    return facultiesWithSelectedSkillId[0];
}

export const getCapableStudentToHelpWithSkill = async (dbProvider: PostgresDbConnectionProvider, studentIdToReceiveHelp: number, skillId: number) => {
    const studentsWithSelectedSkillId: IStudentSkills[] = await dbProvider.db.any(`
        SELECT students.id, students.name, students.house, student_skills.skill_id, student_skills.level
        FROM students
        JOIN student_skills
        ON students.id = student_skills.student_id
        WHERE skill_id = ${skillId};
    `);

    return selectMostCapableStudent(studentIdToReceiveHelp, studentsWithSelectedSkillId);
}

export const selectMostCapableStudent = (studentId: number, studentsWithSelectedSkillId: IStudentSkills[]): IStudentSkills | null => {
    if (!studentsWithSelectedSkillId || studentsWithSelectedSkillId.length === 1) { // Only the loggedInStudent has the selected skill
        return null;
    }

    const loggedInStudentData = studentsWithSelectedSkillId.find((studentDataAndSkills: IStudentSkills) => { 
        return studentDataAndSkills.id === studentId;
    });

    if (!loggedInStudentData) {
        throw new Error("Could not get Student data for given student id");
    }

    const loggedInStudentHouse = loggedInStudentData.house;
    const loggedInStudentLevelInSelectedSkill = loggedInStudentData.level;

    const capableStudents = studentsWithSelectedSkillId
        .filter((student: IStudentSkills) => {
            return student.id !== studentId && student.level > loggedInStudentLevelInSelectedSkill; 
        })
        .sort((a: IStudentSkills, b: IStudentSkills): number => {
            /*
            Sort logic: 

            Sort by level in the specific skill;
            If skill level is the same, sort by the students house. Students with the same house as the loggedInStudent
            should be prioritized.
            */

            const levelSort = b.level - a.level; // Sort level descending
            if (levelSort) return levelSort;

            const aHouseEqualsStudentHouse = a.house === loggedInStudentHouse;
            const bHouseEqualsStudentHouse = b.house === loggedInStudentHouse;
            if (aHouseEqualsStudentHouse === bHouseEqualsStudentHouse) { // Both have (or don't) the loggedInStudent's house
                return 0;
            }

            if (aHouseEqualsStudentHouse) return -1;
            if (bHouseEqualsStudentHouse) return 1;

            return 0;
        });
        
    if (capableStudents.length) {
        return capableStudents[0];
    }

    return null;
};

export const chooseStudentsHelperForSkill = async (dbProvider: PostgresDbConnectionProvider, studentId: number, skillId: number) => {
    const capableStudent = await getCapableStudentToHelpWithSkill(dbProvider, studentId, skillId);
    if (capableStudent) return capableStudent;

    
    const capableFaculty = await getFacultiesWhoTeachesSkill(dbProvider, skillId);
    if (capableFaculty) return capableFaculty;
    
    return null;
};