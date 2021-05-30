
import jwt from 'jsonwebtoken';

export class JWTManager {
    private readonly JWT_EXPIRATION = '3d';
    private readonly JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;
    public generateToken(userId: number) {
        return jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRATION });
    };

    public verifyToken(token: string): any {
        try {
            if (!token) throw new Error('Empty token');
            return jwt.verify(token, this.JWT_SECRET);
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}