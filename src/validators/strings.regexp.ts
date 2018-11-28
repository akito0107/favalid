import { Messager, tester, Validator } from "../core";

export interface IRegExpOption {
  exclude?: boolean;
}

const defaultOption: IRegExpOption = {
  exclude: false
}

export default (
  regex: RegExp,
  messager: Messager,
  option?: IRegExpOption,
): Validator => {
  const opt = { ...defaultOption, ...option }
  if (opt.exclude) {
    return tester((target: string) => !regex.test(target), messager);
  } else {
    return tester((target: string) => regex.test(target), messager);
  }
};
