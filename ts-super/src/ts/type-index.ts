// 索引类型查询操作符
{
  interface Info {
    name: string;
    age: number
  }
  let infoProp: keyof Info;
  infoProp = 'name';
  infoProp = 'age';
  // infoProp = 'sex'; // 报错：不能将类型“"sex"”分配给类型“"name" | "age"”
}

// 和泛型结合使用
function getValueTest<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  return names.map(v => obj[v])
}
const info = {
  name: 'James',
  age: 18
};
let value: string[] = getValueTest(info, ['name']);
// value = getValueTest(info, ['age']); // 报错 不能将类型“number”分配给类型“string”

// 索引访问操作符
{
  interface Info {
    name: string,
    age: number
  };
  type NameType = Info['name'];
  // let name: NameType = 123; // 报错：不能将类型“123”分配给类型“string”
}

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}

{
  interface Obj<T> {
    [key: number]: T
  }
  let key: keyof Obj<number>;
}

{
  interface Obj<T> {
    [key: string]: T
  }
  const obj: Obj<number> = {
    age: 18
  };
  let value: Obj<number>['age'];
}

{
  interface Type {
    a: never;
    b: never;
    c: string;
    d: number;
    e: undefined;
    f: null;
    g: object
  };
  type test = Type[keyof Type];
  // test的类型是string | number | object
}