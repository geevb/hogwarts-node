
export const getFacultiesWithSubject = (subjectId) => {
        // pega faculty pra skill
          // pega skillId, busca subject_id
          // busca faculties que possuem o subject_id
}

export const chooseStudentsHelperForSkill = (studentId, skillId) => {

    const studentData = {}; // model.getStudentData(studentId);

    const capableStudents = []; // pega na student_skills todo mundo com skill_id === skillId && level > studentData.level
    if (capableStudents.length === 0) {
        const subjectId = ''; // pega subject_id da skill;
        const faculties = getFacultiesWithSubject(subjectId);
        return faculties;
    }

    if (capableStudents.length === 1) {
        return capableStudents;
    }

    if (capableStudents.length >= 2) {
        return capableStudents.filter(student => student.house === 'YAY').sort((a,b) => a.level - b.level);
    }

};