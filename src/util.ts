import * as _ from "lodash";

export const strlen = (str: string) => [...str].length;

export const isBlank = s => {
  return (_.isEmpty(s) && !_.isNumber(s)) || _.isNaN(s);
};
