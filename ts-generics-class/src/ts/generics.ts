// 不得不使用any
{
  const getArray = (value: any, times: number = 5): any => {
    return Array(times).fill(value);
  }
  getArray('abc', 3).forEach((item: any) => {
    console.log(item.length);
  });
  getArray(2, 3).forEach((item: any) => {
    console.log(item.length); // 本来应该报错，但是却没有
  });
}

{
  const getArray = <T>(value: T, times: number = 5): T[] => {
    return Array(times).fill(value);
  }
  getArray<string>('abc', 4).forEach(item => {
    console.log(item.length);
  });
  getArray<number>(123, 4).forEach(item => {
    // console.log(item.length); // 这一行报错，number不存在属性length
  })
  getArray(123, 4).forEach(item => {
    // console.log(item.length); // 报错 类型推断
  });
}

// 泛型变量
{
  // const getLength = <T>(param: T): number => {
  //   return param.length; // 报错： 类型T不存在属性length
  // }
}

// 多个泛型变量的情况
{
  const getArray = <T, U>(param1: T, param2: U, times: number): [T, U][] => {
    return Array(times).fill([param1, param2]);
  }
  // getArray(1,'a',3).forEach(item => {
  //   console.log(item[0].length); // 报错：number不存在属性length
  //   console.log(item[1].toFixed(2)); // 报错：string不存在方法toFixed
  // });
}

// 泛型函数类型，简单定义
{
  const getArray: <T>(arg: T, times: number) => T[] = (arg, times) => {
    return Array(times).fill(arg);
  }
}

// 泛型函数类型，使用类型别名
{
  type GetArray = <T>(ars: T, times: number) => T[];
  const getArray: GetArray = <T>(arg: T, times: number): T[] => {
    return Array(times).fill(arg);
  }
}

// 使用接口的形式定义泛型函数类型
{
  interface GetArray {
    <T>(arg: T, times: number): T[]
  }
  const getArray: GetArray = <T>(arg: T, times: number): T[] => {
    return Array(times).fill(arg);
  }
}

// 泛型变量提到最外层
{
  interface GetArray<T> {
    (arg: T, times: number): T[];
  }
  const getArray: GetArray<number> = <T>(arg: T, times: number): T[] => {
    return Array(times).fill(arg);
  }
  // getArray('a',1); // 报错，不能将类型"a"分配给number
  // 使用接口的时候，去定义类型 ： 77行
}

// 泛型约束
{
  interface ValueWithLength {
    length: number;
  }
  // const v: ValueWithLength = {}; // 报错，空对象没有length属性
  const val: ValueWithLength = 'abc'; // 正常，字符串有length属性

  const getLength = <T extends ValueWithLength>(param: T): number => {
    return param.length;
  }
  getLength('abc');
  // getLength(123); // 报错
  getLength({ length: 3 });
  getLength([1, 2, 3]);
}

// 泛型约束中使用类型参数
{
  const getProps = <T, K extends keyof T>(obj: T, props: K) => {
    return obj[props];
  }
  const obj = { a: 'aa', b: 'bb' };
  // getProps(obj, 'c'); // 报错
}