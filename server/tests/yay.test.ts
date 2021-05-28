import { selectMostCapablePerson } from '../src/control'

describe('Validate selectMostCapablePerson function', () => {
    it('different skill level, should prioritize student house', () => {
        const studentsWithSkill = [
            {    
                id: 1,
                name: "Harry Potter",
                house: "Gryffindor",
                skill_id: 2,
                level: 3
            },
            {    
                id: 2,
                name: "Draco Malfoy",
                house: "Slytherin",
                skill_id: 2,
                level: 4
            },
            {    
                id: 3,
                name: "Ron Weasley",
                house: "Gryffindor",
                skill_id: 2,
                level: 1
            },
        ];

        const expectedStudent = {
            id: 2,
            name: "Draco Malfoy",
            house: "Slytherin",
            skill_id: 2,
            level: 4
        };

        const loggedInStudentId = 3;
        const result = selectMostCapablePerson(loggedInStudentId, studentsWithSkill);
        expect(result).toEqual(expectedStudent)
    });
    it('same skill level, should prioritize student house', () => {
        const studentsWithSkill = [
            {    
                id: 1,
                name: "Harry Potter",
                house: "Gryffindor",
                skill_id: 2,
                level: 4
            },
            {    
                id: 2,
                name: "Draco Malfoy",
                house: "Slytherin",
                skill_id: 2,
                level: 4
            },
            {    
                id: 3,
                name: "Ron Weasley",
                house: "Gryffindor",
                skill_id: 2,
                level: 1
            },
        ];

        const expectedStudent = {
            id: 1,
            name: "Harry Potter",
            house: "Gryffindor",
            skill_id: 2,
            level: 4
        };

        const loggedInStudentId = 3;
        const result = selectMostCapablePerson(loggedInStudentId, studentsWithSkill);
        expect(result).toEqual(expectedStudent)
    });
});
  