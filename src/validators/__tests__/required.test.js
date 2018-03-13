import * as assert from 'power-assert';
import required from '../required';

describe('required', () => {
  test('strings', () => {
    const messager = () => 'error';
    const result = required(messager)('str');
    assert.deepStrictEqual(result, {
      error: false,
      message: '',
    });
  });
  test('number', () => {
    const messager = () => 'error';
    const result = required(messager)(123);
    assert.deepStrictEqual(result, {
      error: false,
      message: '',
    });
  });
  test('blank strings', () => {
    const messager = () => 'error';
    const result = required(messager)('');
    assert.deepStrictEqual(result, {
      error: true,
      message: 'error',
    });
  });
  test('white space strings', () => {
    const messager = () => 'error';
    const result = required(messager)(' ');
    assert.deepStrictEqual(result, {
      error: true,
      message: 'error',
    });
  });
  test('null value', () => {
    const messager = () => 'error';
    const result = required(messager)(null);
    assert.deepStrictEqual(result, {
      error: true,
      message: 'error',
    });
  });
  test('undefined value', () => {
    const messager = () => 'error';
    const result = required(messager)(void 0);
    assert.deepStrictEqual(result, {
      error: true,
      message: 'error',
    });
  });
});
