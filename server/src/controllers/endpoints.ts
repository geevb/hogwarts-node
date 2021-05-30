import { Request, Response } from 'express';
import { Application } from 'app';
import { celebrate } from 'celebrate';
import { bestPersonToAskSchema, loginSchema } from './joiSchemas'
import { PasswordManager } from './PasswordManager';
import { UsersModel } from 'models/UsersModel';
import StudentsController from 'controllers/StudentsController'
import { SkillsModel } from 'models/SkillsModel';

export interface IBestPersonToAskRequest {
    skillId: number;
}

export interface ISubjectSkillLevel {
    id: number;
    title: string;
    level: number;
    name: string;
}

export interface IUserLoginCredentials {
    email: string;
    password: string;
}

export function setupEndpoints(application: Application) {
    const app = application;

    app.express.post(
        '/login',
        celebrate(loginSchema),
        async (req, res) => {
            const { email, password } = req.body as IUserLoginCredentials;

            const userModel = new UsersModel();
            const user = await userModel.findUserEmail(email);

            const passwordManager = new PasswordManager();
            if (!user || !passwordManager.comparePassword(user.password, password)) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
        
            // const token = jwtHandler.generateToken(result.user.id);
        
            return res.status(200).json({ k: true });
        }
    );
    
    app.express.get(
        '/bestPersonToAsk', 
        celebrate(bestPersonToAskSchema),
        async (req: Request<any, any, any, IBestPersonToAskRequest>, res: Response) => {
            const skillId = req.query.skillId;
            const studentId = 3;

            const userController = new StudentsController();
            const selectMostCapableStudent = await userController.chooseStudentsHelperForSkill(studentId, skillId);

            return res.send(selectMostCapableStudent);
        }
    );
  
    app.express.get(
        '/skills',
        async (_req: Request, res: Response) => {
            const studentId = 3;

            const skillsModel = new SkillsModel();
            const studentSkills = await skillsModel.getStudentsSkills(studentId);

            return res.send(studentSkills);
        }
    );
}