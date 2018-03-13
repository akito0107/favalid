// @flow

import {tester} from '../core';
import type {Messager, Validator} from '../core';

export interface IRegExpOption {
  exclude?: boolean;
}

export default (
  regex: RegExp,
  messager: Messager,
  {exclude = false}: IRegExpOption,
): Validator => {
  if (exclude) {
    return tester((target: string) => !regex.test(target), messager);
  } else {
    return tester((target: string) => regex.test(target), messager);
  }
};
