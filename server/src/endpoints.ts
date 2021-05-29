import { chooseStudentsHelperForSkill } from './control';
import { Request, Response } from 'express';
import { Application } from 'app';
import { celebrate } from 'celebrate';
import { bestPersonToAskSchema } from 'joiSchemas'

export interface IbestPersonToAskRequest {
    skillId: number;
}

export function setupEndpoints(application: Application) {
    const app = application;
    
    app.express.get('/bestPersonToAsk', 
        celebrate(bestPersonToAskSchema),
        async (req: Request<any, any, any, IbestPersonToAskRequest>, res: Response) => {
            const skillId = req.query.skillId;
            const studentId = 3;;
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
  
    app.express.get('/skills', (_req: Request, res: Response) => {
        const skills = [
            {
                id: 1,
                title: 'Algebra Skill',
                subject_id: 1,
            },
            {
                id: 2,
                title: 'Geometry skill',
                subject_id: 1,
            },
            {
                id: 3,
                title: 'Biology Skill',
                subject_id: 2,
            }
        ];
        res.send(skills);
    });
}