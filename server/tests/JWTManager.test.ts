import jwt from 'jsonwebtoken'
import JWTManager, { IDecokedFacultyJWT, IDecokedStudentJWT } from '../src/controllers/JWTManager'

describe('Validate JWTManager class functions', () => {
    let jwtManager: JWTManager;
    beforeAll(() => {
        process.env = Object.assign(process.env, {
            JWT_SECRET: 'supercoolsecret',
        });
        jwtManager = new JWTManager();
    });

    describe('Validate generateStudentToken function', () => {
        it('returns a jwt string', () => {
            const userId = 1;
            const studentId = 2;
            const jwt = jwtManager.generateStudentToken(userId, studentId);
            expect(jwt.slice(0,2)).toBe('ey');
        });
        it('generates a decodable jwt string with user and student id', () => {
            const userId = 1;
            const studentId = 2;
            const receivedJwt = jwtManager.generateStudentToken(userId, studentId);
            const decoded = jwt.verify(receivedJwt, process.env.JWT_SECRET as string) as IDecokedStudentJWT;
            expect(decoded.userId).toBe(1);
            expect(decoded.studentId).toBe(2); 
        });
    });
    describe('Validate generateFacultyToken function', () => {
        it('returns a jwt string', () => {
            const userId = 9;
            const facultyId = 18;
            const jwt = jwtManager.generateFacultyToken(userId, facultyId);
            expect(jwt.slice(0,2)).toBe('ey');
        });
        it('generates a decodable jwt string with user and student id', () => {
            const userId = 3;
            const facultyId = 27;
            const receivedJwt = jwtManager.generateFacultyToken(userId, facultyId);
            const decoded = jwt.verify(receivedJwt, process.env.JWT_SECRET as string) as IDecokedFacultyJWT;
            expect(decoded.userId).toBe(3);
            expect(decoded.facultyId).toBe(27); 
        });
    });
});