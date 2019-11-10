{
  let value: unknown;
  value = 'abc';
  value = '123';
}

{
  let value2: unknown;
  // let value3: string = value2; // error 不能将类型’unknown‘分配给；类型string
}

{
  let value: unknown;
  // value += 1; // error 对象的类型为unknown
}

{
  type type1 = unknown & string; // type1 => string
  type type2 = number & unknown; // type2 => number
  type type3 = unknown  & unknown; // type3 => unknown
  type type4 = unknown & string[]; // type4 => string[]
}

{
  type type1 = unknown | string; // type1 => unknown
  type type2 = number | unknown; // type2 => unknown
  type type3 = unknown  | any; // type3 => any
  type type4 = unknown | string[]; // type4 => unknown
}

{
  type type1 = never extends unknown ? true : false; // true
}

{
  type type1 = keyof unknown; // never
}

{
  let value1: unknown;
  value1 = 'abc';
  let value2: unknown;
  value2 = '123';
  value1 === value2;
  value1 !== value2;
  // value1 += value2; // error Object is of type 'unknown'
}

{
  let value5: unknown;
  // value5.age; // error
  // value5(); // error
  // new value5(); // error
}

{
  type Types<T> = { [P in keyof T]: number };
  type type1 = Types<any>; // {[x: string: number]}
  type type2 = Types<unknown>; // {}
}