import PasswordManager from '../src/controllers/PasswordManager'

describe('Validate PasswordManager class functions', () => {
    const passwordController = new PasswordManager();
    describe('Validate hashPassword function', () => {
        it('returns hashed value', () => {
            const hashedPassword = passwordController.hashPassword('test');
            expect(hashedPassword.charAt(0)).toBe('$');
        });
        it('changes the hashed response everytime its called', () => {
            const pass = 'test';
            const hashedPass_1 = passwordController.hashPassword(pass);
            const hashedPass_2 = passwordController.hashPassword(pass);
            expect(hashedPass_1 !== hashedPass_2).toBe(true);
        });
    });
    describe('Validate comparePassword function', () => {
        it('returns true when matching', () => {
            const hashedPassword = passwordController.hashPassword('test');
            const compare = passwordController.comparePassword(hashedPassword, 'test');
            expect(compare).toBe(true);
        });
        it('returns false when not matching', () => {
            const hashedPassword = passwordController.hashPassword('test');
            const compare = passwordController.comparePassword(hashedPassword, 'test123');
            expect(compare).toBe(false);
        });
    });
});
  