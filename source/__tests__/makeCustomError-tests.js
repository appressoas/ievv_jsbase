import makeCustomError from "../makeCustomError";

describe('makeCustomError', () => {

    it('name is set correctly', () => {
        let MyError = makeCustomError('MyError');
        let error = new MyError();
        expect(error.name).toEqual('MyError');
    });

    it('instanceof works', () => {
        let MyErrorA = makeCustomError('MyErrorA');
        let errora = new MyErrorA();
        let MyErrorB = makeCustomError('MyErrorB');
        let errorb = new MyErrorB();
        expect(errora instanceof Error).toBe(true);
        expect(errora instanceof MyErrorA).toBe(true);
        expect(errora instanceof MyErrorB).toBe(false);
    });

    it('inheritance from builtins works', () => {
        let MyError = makeCustomError('MyError', TypeError);
        let error = new MyError();
        expect(error instanceof MyError).toBe(true);
        expect(error instanceof TypeError).toBe(true);
        expect(error instanceof Error).toBe(true);
    });

    it('inheritance from custom works', () => {
        let MySuperError = makeCustomError('MySuperError');
        let MySubError = makeCustomError('MySubError', MySuperError);
        let error = new MySubError();
        expect(error instanceof MySubError).toBe(true);
        expect(error instanceof MySuperError).toBe(true);
        expect(error instanceof Error).toBe(true);
    });

    it('inheritance deep works', () => {
        let MySuperError = makeCustomError('MySuperError', TypeError);
        let MySubError = makeCustomError('MySubError', MySuperError);
        let error = new MySubError();
        expect(error instanceof MySubError).toBe(true);
        expect(error instanceof MySuperError).toBe(true);
        expect(error instanceof TypeError).toBe(true);
        expect(error instanceof Error).toBe(true);
    });

});
