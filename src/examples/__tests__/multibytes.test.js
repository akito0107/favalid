import * as assert from 'power-assert';
import {halfKanaValidator} from '../multibytes';

describe('half kana', () => {
  test('全角文字', () => {
    const target = '名前';
    assert.deepStrictEqual(halfKanaValidator(target), {
      error: false,
      message: '',
    });
  });
  test('半角文字混入', () => {
    const target = '名前ｶﾀｶﾅ';
    assert.deepStrictEqual(halfKanaValidator(target), {
      error: true,
      message: '名前ｶﾀｶﾅに半角文字が含まれています。',
    });
  });
});
