import { Request, Response } from 'express';
import { Application } from 'app';
import { celebrate } from 'celebrate';
import { bestPersonToAskSchema, loginSchema } from './joiSchemas'
import { PasswordManager } from './PasswordManager';
import { UsersModel } from 'models/UsersModel';
import StudentsController from 'controllers/StudentsController'
import { SkillsModel } from 'models/SkillsModel';
import { JWTManager } from './JWTManager';

import requireAuth from './auth';
import { StudentsModel } from 'models/StudentsModel';
const mustAuth = requireAuth();

interface IBestPersonToAskRequest {
    skillId?: number;
};

interface IUserLoginCredentialsRequest {
    email: string;
    password: string;
};

interface IUserRequest { 
    userId: number;
    iat: number; 
    exp: number;
    studentId?: number;
    facultyId?: number;
}

export function setupEndpoints(application: Application) {
    const app = application;

    app.express.post(
        '/login',
        celebrate(loginSchema),
        async (req, res) => {
            const { email, password } = req.body as IUserLoginCredentialsRequest;

            const userModel = new UsersModel();
            const user = await userModel.getUserByEmail(email);

            const passwordManager = new PasswordManager();
            if (!user || !passwordManager.comparePassword(user.password, password)) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const jwtManager = new JWTManager();
            if (user.role === 'student') {
                const studentModel = new StudentsModel();
                const student = await studentModel.getStudentByUserId(user.user_id);
                if (student) {
                    const token = jwtManager.generateStudentToken(user.user_id, student.student_id);
                    return res.send({ token });
                }
            }

            if (user.role === 'faculty') {
                // TODO
            }
                
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    );
    
    app.express.get(
        '/bestPersonToAsk',
        mustAuth,
        celebrate(bestPersonToAskSchema),
        async (req: Request, res: Response) => {
            const { studentId } = req.user as IUserRequest;
            const { skillId } = req.query as IBestPersonToAskRequest;
            if (!skillId || !studentId) { 
                return res.status(403).send({ message: 'Forbidden' }); 
            }

            const userController = new StudentsController();
            const selectMostCapableStudent = await userController.chooseStudentsHelperForSkill(studentId, skillId);

            return res.send(selectMostCapableStudent);
        }
    );
  
    app.express.get(
        '/skills',
        mustAuth,
        async (req: Request, res: Response) => {
            const { studentId } = req.user as IUserRequest;
            if (!studentId) {
                return res.status(403).send({ message: 'Forbidden' });
            }

            const skillsModel = new SkillsModel();
            const studentSkills = await skillsModel.getStudentsSkills(studentId);

            return res.send(studentSkills);
        }
    );
}
