import { PostgresDbConnectionProvider } from './storage/postgresDbConnectionProvider'

export const getFacultiesWithSubject = (subjectId: number) => {
        // pega faculty pra skill
          // pega skillId, busca subject_id
          // busca faculties que possuem o subject_id
}

export const selectMostCapablePerson = (studentId: number, studentsWithSelectedSkillId: any) => {
    if (!studentsWithSelectedSkillId || studentsWithSelectedSkillId.length === 1) { // Only the loggedInStudent has the selected skill
        return { FACULTY: true };
        // return getFacultyWithSkill(skillId);
    }

    const loggedInStudentData = studentsWithSelectedSkillId.find((studentDataAndSkills: any) => { 
        return studentDataAndSkills.id === studentId;
    });

    const loggedInStudentHouse = loggedInStudentData.house;
    const loggedInStudentLevelInSelectedSkill = loggedInStudentData.level;

    const capableStudents = studentsWithSelectedSkillId
        .filter((student: any) => {
            return student.id !== studentId && student.level > loggedInStudentLevelInSelectedSkill; 
        })
        .sort((a: any, b: any) => {
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
        });
        
    if (capableStudents.length) {
        return capableStudents[0];
    }

    return { FACULTY: true };
};

export const chooseStudentsHelperForSkill = async (dbProvider: PostgresDbConnectionProvider, studentId: number, skillId: number) => {
    const studentsWithSelectedSkillId = await dbProvider.db.any(`
        SELECT students.id, students.name, students.house, student_skills.skill_id, student_skills.level
        FROM students
        JOIN student_skills
        ON students.id = student_skills.student_id
        WHERE skill_id = ${skillId};
    `);

    return selectMostCapablePerson(studentId, studentsWithSelectedSkillId);
};