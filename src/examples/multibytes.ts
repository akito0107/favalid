import { combine } from "../core";
import { required } from "../validators/required";
import { regexp } from "../validators/strings";

const REQUIRED_NAME = () => "名前を入力してください。";

const HALF_KANA_REGEX = /[ｦ-ﾟ]/;
const HALF_KANA_MESSAGE = name => () => `${name}に半角文字が含まれています。`;

export const halfKanaValidator = name => {
  return combine(
    required(REQUIRED_NAME),
    regexp(HALF_KANA_REGEX, HALF_KANA_MESSAGE(name), {
      exclude: true
    })
  )(name);
};
