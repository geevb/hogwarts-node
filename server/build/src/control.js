"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseStudentsHelperForSkill = exports.selectMostCapablePerson = exports.getFacultiesWithSubject = void 0;
const getFacultiesWithSubject = (subjectId) => {
    // pega faculty pra skill
    // pega skillId, busca subject_id
    // busca faculties que possuem o subject_id
};
exports.getFacultiesWithSubject = getFacultiesWithSubject;
const selectMostCapablePerson = (studentId, studentsWithSelectedSkillId) => {
    if (!studentsWithSelectedSkillId || studentsWithSelectedSkillId.length === 1) { // Only the loggedInStudent has the selected skill
        return { FACULTY: true };
        // return getFacultyWithSkill(skillId);
    }
    const loggedInStudentData = studentsWithSelectedSkillId.find((studentDataAndSkills) => {
        return studentDataAndSkills.id === studentId;
    });
    const loggedInStudentHouse = loggedInStudentData.house;
    const loggedInStudentLevelInSelectedSkill = loggedInStudentData.level;
    const capableStudents = studentsWithSelectedSkillId
        .filter((student) => {
        return student.id !== studentId && student.level > loggedInStudentLevelInSelectedSkill;
    })
        .sort((a, b) => {
        /*
        Sort logic:

        Sort by level in the specific skill;
        If skill level is the same, sort by the students house. Students with the same house as the loggedInStudent
        should be prioritized.
        */
        const levelSort = b.level - a.level; // Sort level descending
        if (levelSort)
            return levelSort;
        const aHouseEqualsStudentHouse = a.house === loggedInStudentHouse;
        const bHouseEqualsStudentHouse = b.house === loggedInStudentHouse;
        if (aHouseEqualsStudentHouse === bHouseEqualsStudentHouse) { // Both have (or don't) the loggedInStudent's house
            return 0;
        }
        if (aHouseEqualsStudentHouse)
            return -1;
        if (bHouseEqualsStudentHouse)
            return 1;
    });
    if (capableStudents.length) {
        return capableStudents[0];
    }
    return { FACULTY: true };
};
exports.selectMostCapablePerson = selectMostCapablePerson;
const chooseStudentsHelperForSkill = (dbProvider, studentId, skillId) => __awaiter(void 0, void 0, void 0, function* () {
    const studentsWithSelectedSkillId = yield dbProvider.db.any(`
        SELECT students.id, students.name, students.house, student_skills.skill_id, student_skills.level
        FROM students
        JOIN student_skills
        ON students.id = student_skills.student_id
        WHERE skill_id = ${skillId};
    `);
    return exports.selectMostCapablePerson(studentId, studentsWithSelectedSkillId);
});
exports.chooseStudentsHelperForSkill = chooseStudentsHelperForSkill;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVPLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxTQUFpQixFQUFFLEVBQUU7SUFDckQseUJBQXlCO0lBQ3ZCLGlDQUFpQztJQUNqQywyQ0FBMkM7QUFDckQsQ0FBQyxDQUFBO0FBSlksUUFBQSx1QkFBdUIsMkJBSW5DO0FBRU0sTUFBTSx1QkFBdUIsR0FBRyxDQUFDLFNBQWlCLEVBQUUsMkJBQWdDLEVBQUUsRUFBRTtJQUMzRixJQUFJLENBQUMsMkJBQTJCLElBQUksMkJBQTJCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxFQUFFLGtEQUFrRDtRQUM5SCxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3pCLHVDQUF1QztLQUMxQztJQUVELE1BQU0sbUJBQW1CLEdBQUcsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQXlCLEVBQUUsRUFBRTtRQUN2RixPQUFPLG9CQUFvQixDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztJQUN2RCxNQUFNLG1DQUFtQyxHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztJQUV0RSxNQUFNLGVBQWUsR0FBRywyQkFBMkI7U0FDOUMsTUFBTSxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7UUFDckIsT0FBTyxPQUFPLENBQUMsRUFBRSxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLG1DQUFtQyxDQUFDO0lBQzNGLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRTtRQUNyQjs7Ozs7O1VBTUU7UUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyx3QkFBd0I7UUFDN0QsSUFBSSxTQUFTO1lBQUUsT0FBTyxTQUFTLENBQUM7UUFFaEMsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLG9CQUFvQixDQUFDO1FBQ2xFLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxvQkFBb0IsQ0FBQztRQUNsRSxJQUFJLHdCQUF3QixLQUFLLHdCQUF3QixFQUFFLEVBQUUsbURBQW1EO1lBQzVHLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFFRCxJQUFJLHdCQUF3QjtZQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEMsSUFBSSx3QkFBd0I7WUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUVQLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRTtRQUN4QixPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3QjtJQUVELE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDN0IsQ0FBQyxDQUFDO0FBNUNXLFFBQUEsdUJBQXVCLDJCQTRDbEM7QUFFSyxNQUFNLDRCQUE0QixHQUFHLENBQU8sVUFBd0MsRUFBRSxTQUFpQixFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQy9ILE1BQU0sMkJBQTJCLEdBQUcsTUFBTSxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQzs7Ozs7MkJBS3JDLE9BQU87S0FDN0IsQ0FBQyxDQUFDO0lBRUgsT0FBTywrQkFBdUIsQ0FBQyxTQUFTLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztBQUMzRSxDQUFDLENBQUEsQ0FBQztBQVZXLFFBQUEsNEJBQTRCLGdDQVV2QyJ9