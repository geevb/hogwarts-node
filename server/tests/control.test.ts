import StudentsController, { IStudentSkills } from '../src/controllers/StudentsController'

describe('Validate selectMostCapablePerson function', () => {
    it('different skill level, should prioritize student house', () => {
        const studentsWithSkill = [
            {
                student_id: 1,
                name: 'Harry Potter',
                house: 'Gryffindor',
                skill_id: 2,
                level: 3
            },
            {
                student_id: 2,
                name: 'Draco Malfoy',
                house: 'Slytherin',
                skill_id: 2,
                level: 4
            },
            {
                student_id: 3,
                name: 'Ron Weasley',
                house: 'Gryffindor',
                skill_id: 2,
                level: 1
            },
        ] as IStudentSkills[];

        const expectedStudent = {
            student_id: 2,
            name: 'Draco Malfoy',
            house: 'Slytherin',
            skill_id: 2,
            level: 4
        };

        const loggedInStudentId = 3;
        const studentsController = new StudentsController();
        const result = studentsController.selectMostCapableStudent(loggedInStudentId, studentsWithSkill);
        expect(result).toEqual(expectedStudent)
    });
    it('same skill level, should prioritize student house', () => {
        const studentsWithSkill = [
            {    
                student_id: 1,
                name: 'Harry Potter',
                house: 'Gryffindor',
                skill_id: 2,
                level: 4
            },
            {    
                student_id: 2,
                name: 'Draco Malfoy',
                house: 'Slytherin',
                skill_id: 2,
                level: 4
            },
            {
                student_id: 3,
                name: 'Ron Weasley',
                house: 'Gryffindor',
                skill_id: 2,
                level: 1
            },
        ] as IStudentSkills[];

        const expectedStudent = {
            student_id: 1,
            name: 'Harry Potter',
            house: 'Gryffindor',
            skill_id: 2,
            level: 4
        };

        const loggedInStudentId = 3;
        const studentsController = new StudentsController();
        const result = studentsController.selectMostCapableStudent(loggedInStudentId, studentsWithSkill);
        expect(result).toEqual(expectedStudent)
    });
});
  