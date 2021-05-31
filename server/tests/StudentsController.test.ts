import StudentsController, { IStudentSkills } from '../src/controllers/StudentsController'

describe('Validate selectMostCapablePerson function', () => {
    const studentsController = new StudentsController();
    it('prioritizes student level', () => {
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
        const result = studentsController.selectMostCapableStudent(loggedInStudentId, studentsWithSkill);
        expect(result).toEqual(expectedStudent)
    });
    it('prioritizes student house', () => {
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
        const result = studentsController.selectMostCapableStudent(loggedInStudentId, studentsWithSkill);
        expect(result).toEqual(expectedStudent)
    });
    it('only get students with higher skill level', () => {
        const studentsWithSkill = [
            {    
                student_id: 1,
                name: 'Harry Potter',
                house: 'Gryffindor',
                skill_id: 2,
                level: 2
            },
            {    
                student_id: 2,
                name: 'Draco Malfoy',
                house: 'Slytherin',
                skill_id: 2,
                level: 3
            },
            {
                student_id: 3,
                name: 'Ron Weasley',
                house: 'Gryffindor',
                skill_id: 2,
                level: 3
            },
        ] as IStudentSkills[];

        const loggedInStudentId = 3;
        const result = studentsController.selectMostCapableStudent(loggedInStudentId, studentsWithSkill);
        expect(result).toEqual(null);
    });
    it('only get students with skill level 3 or higher', () => {
        const studentsWithSkill = [
            {    
                student_id: 1,
                name: 'Harry Potter',
                house: 'Gryffindor',
                skill_id: 2,
                level: 2
            },
            {    
                student_id: 2,
                name: 'Draco Malfoy',
                house: 'Slytherin',
                skill_id: 1,
                level: 2
            },
            {
                student_id: 3,
                name: 'Ron Weasley',
                house: 'Gryffindor',
                skill_id: 0,
                level: 1
            },
        ] as IStudentSkills[];

        const loggedInStudentId = 3;
        const result = studentsController.selectMostCapableStudent(loggedInStudentId, studentsWithSkill);
        expect(result).toEqual(null)
    });
    it('throws error if studentsWithSkill does not having requesting student', () => {
        const studentsWithSkill = [
            {    
                student_id: 1,
                name: 'Harry Potter',
                house: 'Gryffindor',
                skill_id: 2,
                level: 1
            },
            {    
                student_id: 2,
                name: 'Draco Malfoy',
                house: 'Slytherin',
                skill_id: 2,
                level: 2
            }
        ] as IStudentSkills[];

        const loggedInStudentId = 3;
        expect(() => {
            studentsController.selectMostCapableStudent(loggedInStudentId, studentsWithSkill)
        }).toThrow(Error);
    });
});
  