import locale2 from "locale2";
import { Messager } from "./core";

export type LocaleProvider = () => string;

export interface IMessagerWithLocale {
  locale: string;
  messager: Messager;
  isDefault: boolean;
}

export const defaultLocaleProvider: LocaleProvider = () => locale2;

export const messagersWithLocale = (
  messagers: IMessagerWithLocale[],
  provider: LocaleProvider = defaultLocaleProvider
): Messager => {
  const memo = messagers.reduce((m: IMessagerWithLocale, current) => {
    m[current.locale] = m.messager;
    return m;
  }, {});
  const defaultMessage = messagers.find(({ isDefault }) => isDefault);
  if (!defaultMessage) {
    throw new Error("default messager is not provided");
  }
  const defaultMessager = defaultMessage.messager;
  return (v: any) => {
    const currentLocale = provider();
    const messager = memo[currentLocale] || defaultMessager;
    return messager(v);
  };
};
