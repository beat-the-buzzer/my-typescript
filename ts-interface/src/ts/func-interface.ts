// 为函数定义类型
function add(arg1: number, arg2: number): number {
  return arg1 + arg2
}

{
  const add = (arg1: number, arg2: number): number => arg1 + arg2;
}

// 使用接口定义函数
{
  interface Add {
    (x: number, y: number): number
  }
  let add: Add = (arg1, arg2) => arg1 + arg2;
  // add(1,'2'); // 报错 类型不对
  // add(1, 2, 3); // 报错，参数数量不对
  add(1, 2); // 3
}

// 使用类型别名
{
  type Add = (x: number, y: number) => number;
  // let add: Add = (args1: string, args2: string):string => args1 + args2; // 报错，类型错误
  let add: Add = (arg1: number, arg2: number) => arg1 + arg2;
  // add(1,'2'); // 报错 类型不对
  // add(1, 2, 3); // 报错，参数数量不对
  add(1, 2); // 3
}

// 可选参数位置
{
  // type Add = (x?: number, y: number) => number; // 报错，必选参数不能位于可选参数后面
}

// 默认参数
{
  // y = 2 类型推论
  const add = (x: number, y = 2): number => x + y;
  // add(1, '2'); // 报错，类型不对
}

// 剩余参数
{
  const handleData = (arg1: number, ...args: number[]) => {
    if (args.length === 0) {
      return arg1 * 2;
    } else if (args.length === 1) {
      return arg1 * args[0];
    } else {
      return [arg1, ...args].join('_');
    }
  }
  handleData(1, 2, 3, 4, 5);
}