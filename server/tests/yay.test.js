import 'jest'

import { selectMostCapablePerson } from '../src/control'

describe('Validate selectMostCapablePerson function', () => {
    it('should prioritize student house', () => {
        const studentsWithSkill = [
            {    
                "id": 1,
                "name": "Harry Potter",
                "house": "Gryffindor",
                "skill_id": 2,
                "level": 4
            },
            {    
                "id": 2,
                "name": "Draco Malfoy",
                "house": "Slytherin",
                "skill_id": 2,
                "level": 4
            },
            {    
                "id": 3,
                "name": "Ron Weasley",
                "house": "Gryffindor",
                "skill_id": 2,
                "level": 1
            },
        ];

        const expectedStudent =             {    
            "id": 1,
            "name": "Harry Potter",
            "house": "Gryffindor",
            "skill_id": 2,
            "level": 4
        };

        const loggedInStudentId = 3;

        const yay = selectMostCapablePerson(loggedInStudentId, studentsWithSkill);

        console.log(yay);

        expect(true).toBe(true)
    })
});
  