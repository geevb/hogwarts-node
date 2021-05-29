import { chooseStudentsHelperForSkill } from './control';
import { Request, Response } from 'express';
import { Application } from 'app';
import { celebrate } from 'celebrate';
import { bestPersonToAskSchema } from 'joiSchemas'

export interface IBestPersonToAskRequest {
    skillId: number;
}

export interface ISubjectSkillLevel {
    id: number;
    title: string;
    level: number;
    name: string;
}

export function setupEndpoints(application: Application) {
    const app = application;
    
    app.express.get(
        '/bestPersonToAsk', 
        celebrate(bestPersonToAskSchema),
        async (req: Request<any, any, any, IBestPersonToAskRequest>, res: Response) => {
            const skillId = req.query.skillId;
            const studentId = 3;
            return res.send(await chooseStudentsHelperForSkill(app.dbProvider, studentId, skillId));
        }
    );
    
    app.express.get('/faculty', (_req: Request, res: Response) => {
        const faculty = [
            {
                id: 1,
                name: 'Michael Granado',
                subject_ids: [3, 4],
            },
            {
                id: 2,
                name: 'Carolyn Reeves',
                subject_ids: [1, 2],
            },
        ];
        res.send(faculty);
    });
  
    app.express.get('/skills', async (_req: Request, res: Response) => {
        const studentId = 3;
        const skills: ISubjectSkillLevel[] = await app.dbProvider.db.any(`
            SELECT skills.id, skills.title, ss.level, s.name FROM skills
            JOIN subjects s on s.id = skills.subject_id
            JOIN student_skills ss on skills.id = ss.skill_id
            WHERE student_id = ${studentId};
        `);

        return res.send(skills);
    });
}