import bcrypt from 'bcrypt';

export default class PasswordManager {
    public hashPassword(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    };

    public comparePassword(hashedPassword: string, password: string): boolean {
        return bcrypt.compareSync(password, hashedPassword);
    };
};