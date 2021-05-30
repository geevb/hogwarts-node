import bcrypt from 'bcrypt';

export class PasswordManager {
    public hashPassword(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    };

    public comparePassword(hashPassword: string, password: string) {
        return bcrypt.compareSync(password, hashPassword);
    };
};