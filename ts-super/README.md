## Typescript高级用法

#### 类型推论

1、基本的类型推论

在一些定义中如果没有明确指定类型，编辑器会自动推断出合适的类型。如果是一个数组或者元组包含多个元素值，typescript会将多个元素合并起来，组成一个联合类型。

```ts
let name = "hello";
name = 123; // error 不能将类型“123”分配给类型“string”
let arr = [1, 'a'];
arr = ['b', 0, false]; // error 不能将类型“false”分配给类型“string | number”
let value = Math.random() * 10 > 5 ? 'abc' : 123;
value = false; // error 不能将类型“false”分配给类型“string | number”
```

2、上下文类型

上面的类型推论是直接使用赋值符号右边的类型推断出左侧值的类型，而上下文类型是从左侧类型推断右侧值的类型。

```ts
window.onmousedown = function(e) {
  // console.log(e.a); // error 类型"mouseEvent"上不存在属性"a"
}
```

#### 类型兼容性

1、函数参数的个数

如果对函数y进行赋值，那么要求x中的每个参数在y中都有对应，也就是x中参数的个数小于等于y中的参数个数；

传给forEach的函数有三个参数，但有时候，我们只需要一个。此时如果只传一个参数，是可以正常运行的，但是不能传三个以上的参数。

```ts
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
arr.forEach((item, index, array, other) => {
  console.log(item);
});
```

2、函数参数的类型、函数返回值的类型

```ts
let x = (a: number) => 0;
let y = (b: string) => 0;
let z = (c: string) => false;
x = y; // error 参数“b”和“a” 的类型不兼容。不能将类型“number”分配给类型“string”
x = z; // error 参数“c”和“a” 的类型不兼容。不能将类型“number”分配给类型“string”。
y = z; // error 不能将类型“boolean”分配给类型“number”。
```

3、函数的剩余参数和可选参数

当要被赋值的函数参数中包含剩余参数(...args)时，赋值的函数可以使用任意个数的参数代替，但是类型需要对应。

```ts
const getNum = (
  arr: number[], // 第一个参数是一个数组
  callback: (...args: number[]) => number, // 第二个参数是一个函数，这个函数可以传任意多的参数，但是参数的类型和返回值类型必须要是数字类型
): number => {
  return callback(...arr);
};
getNum([1, 2], (...args: number[]): number => args.length);
getNum([1, 2], (...args: number[]) => args.toString()); // 报错
```

可选参数也是类似的操作

```ts
const getNum = (
  arr: number[],
  callback: (arg1: number, arg2?: number) => number, // 指定第二个参数是函数，这个函数的第二个参数是可选的
): number => {
  // return callback(...arr); // error应有 1-2 个参数，但获得的数量大于等于 0。ts(2556)
  return callback(1, arr[0]);
}
```

4、函数参数双向协定

5、函数重载

sum函数的重载少了参数都为string返回值为string的情况，与merge不兼容

```ts
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
func = sum; // error:不能将类型“string”分配给类型“number”
```



