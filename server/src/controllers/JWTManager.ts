
import jwt from 'jsonwebtoken';

export interface IDecokedStudentJWT {
    userId: number;
    studentId: number;
}

export interface IDecokedFacultyJWT {
    userId: number;
    facultyId: number;
}

export default class JWTManager {
    private readonly JWT_EXPIRATION = process.env.JWT_EXPIRATION || '3d';
    private readonly JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;

    public generateStudentToken(userId: number, studentId: number): string {
        return jwt.sign({ userId, studentId }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRATION });
    };

    public generateFacultyToken(userId: number, facultyId: number): string {
        return jwt.sign({ userId, facultyId }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRATION });
    };
}