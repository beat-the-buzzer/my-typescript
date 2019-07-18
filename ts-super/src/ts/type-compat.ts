// 函数参数的个数
{
  let x = (a: number) => 0;
  let y = (b: number, c: number) => 0;
  y = x; // 正常
  // x = y; // error 不能将类型“(b: number, c: number) => number”分配给类型“(a: number) => number”

  const arr = [1, 2, 3];
  arr.forEach((item, index, array) => {
    console.log(item);
  });
  arr.forEach(item => {
    console.log(item);
  });
  // 下面的代码会报错
  // arr.forEach((item, index, array, other) => {
  //   console.log(item);
  // });
}

// 函数参数的类型和返回值的类型
{
  let x = (a: number) => 0;
  let y = (b: string) => 0;
  let z = (c: string) => false;
  // x = y; // error 参数“b”和“a” 的类型不兼容。不能将类型“number”分配给类型“string”
  // x = z; // error 参数“c”和“a” 的类型不兼容。不能将类型“number”分配给类型“string”。
  // y = z; // error 不能将类型“boolean”分配给类型“number”。
}

// 剩余参数和可选参数
{
  const getNum = (
    arr: number[], // 第一个参数是一个数组
    callback: (...args: number[]) => number, // 第二个参数是一个函数，这个函数可以传任意多的参数，但是参数的类型和返回值类型必须要是数字类型
  ): number => {
    return callback(...arr);
  };
  getNum([1, 2], (...args: number[]): number => args.length);
  // getNum([1, 2], (...args: number[]) => args.toString()); // 报错
}

{
  const getNum = (
    arr: number[],
    callback: (arg1: number, arg2?: number) => number, // 指定第二个参数是函数，这个函数的第二个参数是可选的
  ): number => {
    // return callback(...arr); // error应有 1-2 个参数，但获得的数量大于等于 0。ts(2556)
    return callback(1, arr[0]);
  }
}

// 函数参数双向协定
{
  let funcA = function (arg: number | string): void {

  } 
  let funcB = function (arg: number): void {

  }
  // funcA = funcB; // 报错 ？ 

}

// 函数重载
function merge(arg1: number, arg2: number): number;
function merge(arg1: string, arg2: string): string;
function merge(arg1: any, arg2: any) {
  return arg1 + arg2;
}
function sum(arg1: number, arg2: number): number;
function sum(arg1: any, arg2: any) {
  return arg1 + arg2;
}
let func = merge;
// func = sum; // error:不能将类型“string”分配给类型“number”