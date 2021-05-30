import { Request, Response, NextFunction } from 'express';
import jwt from 'express-jwt';

const tokenCheck = () => {
    const jwtOpts: jwt.Options = {
        secret: process.env.JWT_SECRET as string,
        algorithms: ['HS256'],
        getToken: (req: Request): string | null => {
            try {
                const token = req.headers.authorization;
                if (token && token.split(' ')[0].toLowerCase() === 'bearer') {
                    return token.split(' ')[1];
                }
            } catch (e) {
                console.log(e);
            }

            return null;
        },
    };

    return jwt(jwtOpts);
}

export default function () {
    const check = tokenCheck();
    return (req: Request, res: Response, next: NextFunction) => {
        check(req, res, async (err: any): Promise<void | Response> => {
            if (!err) {
                return next();
            }

            return res.status(401).json({ message: 'Unauthorized' });
        });
    };
}