import { FacultiesModel } from 'models/FacultiesModel';
import { StudentsModel } from 'models/StudentsModel';

export interface IStudentSkills {
    id: number;
    name: string;
    house: string;
    level: number;
    skill_id: number;
}

export default class StudentsController {
    public selectMostCapableStudent = (studentId: number, studentsWithSelectedSkillId: IStudentSkills[]): IStudentSkills | null => {
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

    public chooseStudentsHelperForSkill = async (studentId: number, skillId: number) => {
        const modelStudents = new StudentsModel();
        const studentsWithSkill = await modelStudents.getStudentsWithSkill(studentId, skillId);
        const capableStudent = this.selectMostCapableStudent(studentId, studentsWithSkill);
        if (capableStudent) return capableStudent;
    
        
        const facultiesModel = new FacultiesModel();
        const capableFaculty = await facultiesModel.getFacultiesWhoTeachesSkill(skillId);
        if (capableFaculty) return capableFaculty[0]; // We only want one faculty
        
        return null;
    };
}