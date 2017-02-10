import {getFileExtension} from "../../utils/filepath";
import {splitExtension} from "../../utils/filepath";

describe('filepath/getFileExtension', () => {
    it('getFileExtension() empty string', () => {
        expect(getFileExtension('')).toEqual('');
    });

    it('getFileExtension() simple', () => {
        expect(getFileExtension('test.jpg')).toEqual('jpg');
    });

    it('getFileExtension() multiple . but unknown secondary', () => {
        expect(getFileExtension('test.the.stuff.jpg')).toEqual('jpg');
    });

    it('getFileExtension() multiple . with known secondary', () => {
        expect(getFileExtension('test.tar.gz')).toEqual('tar.gz');
    });

});
