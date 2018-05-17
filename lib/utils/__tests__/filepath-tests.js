"use strict";

var _filepath = require("../../utils/filepath");

describe('filepath/getFileExtension', function () {
  it('getFileExtension() empty string', function () {
    expect((0, _filepath.getFileExtension)('')).toEqual('');
  });
  it('getFileExtension() simple', function () {
    expect((0, _filepath.getFileExtension)('test.jpg')).toEqual('jpg');
  });
  it('getFileExtension() multiple . but unknown secondary', function () {
    expect((0, _filepath.getFileExtension)('test.the.stuff.jpg')).toEqual('jpg');
  });
  it('getFileExtension() multiple . with known secondary', function () {
    expect((0, _filepath.getFileExtension)('test.tar.gz')).toEqual('tar.gz');
  });
});