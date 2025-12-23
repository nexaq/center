import {unformat} from "@react-input/number-format";

export const unformatIfString = (x: number | string) => {
  if (typeof x === 'string') {
    return Number(unformat(x));
  }

  return x;
}