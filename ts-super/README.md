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

#### 类型保护

1、使用类型断言

```ts
const valueList = [123, 'abc'];
const getRandomValue = () => {
  const number = Math.random() * 10; // 取一个0到10范围内的随机值
  if(number < 5) {
    return valueList[0];
  } else {
    return valueList[1];
  }
}
const item = getRandomValue();
if(item.length != null) {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}
```

上面代码的逻辑在js里面是没有问题的，如果item没有length属性，就把它当做数字类型处理。不过这段代码在ts中会报错。类型“string | number”上不存在属性“length”

我们在前面可以使用类型断言的方式解决这个问题：

```ts
if((<string>item).length != null) {
  console.log((<string>item).length);
} else {
  console.log(item)
}
```

2、自定义类型保护

如果每个地方都使用类型断言，就会有很多冗余，我们可以使用更加优雅的方式实现类型保护。

```ts
const valueList = [123, 'abc'];
const getRandomValue = () => {
  const value = Math.random()* 10;
  if(value < 5) {
    return valueList[0];
  } else {
    return valueList[1];
  }
}
function isString(value: number | string): value is string {
  return typeof value === 'string'
}
const item = getRandomValue();
if(isString(item)) {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}
```

`value is string`叫做类型谓语，value的名字要和参数名保持一致。函数的返回值是一个boolean类型，如果为true，表示传入的值的类型是is后面的type。

3、typeof类型保护

在TS中国，如果是基本类型，我们可以直接使用typeof做类型判断。

```ts
if(typeof item === 'string') {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}
```

在TS中，使用typeof还有一些特殊的前提：

 - 只能使用等于或者不等于来比较
 - type只能是number、string、boolean和symbol

 ```ts
const valueList = [{}, () => {}];
const getRandomValue = () => {
  const number = Math.random() * 10;
  if(number < 5) {
    return valueList[0];
  } else {
    return valueList[1];
  }
}
const res = getRandomValue();
if(typeof res === 'object') {
  console.log(res.toString());
} else {
  console.log(res()); // 报错 无法调用类型缺少调用签名的表达式。类型“{}”没有兼容的调用签名。
}
 ```

 4、instanceof类型保护

 instanceof操作符是JS中的原生操作符，用来判断一个实例是不是某个构造函数创建的，或者是不是使用ES6语法的某个类创建的。TS中可以用来做类型保护。

```ts
 class CreateByClass1 {
  public age = 18;
  constructor() { }
}
class CreateByClass2 {
  public name = 'James';
  constructor() { }
}
function getRandomItem() {
  return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2();
}
const citem = getRandomItem();
if (citem instanceof CreateByClass1) {
  console.log(citem.age);
} else {
  console.log(citem.name);
}
```

#### 显式赋值断言

关于null和undefined：

1、null和undefined赋值给其他类型

```ts
let str = 'James';
str = null; // error: 不能将类型“null”分配给类型“string”。
let strNull: string | null = 'James';
strNull = null;
strNull = undefined; // error: 不能将类型“undefined”分配给类型“string | null”。
```

2、可选参数和可选属性

如果在tsconfig.json里面配置了`"strictNullChecks": true`，可选参数会被自动加上`|undefined`

```ts
const sum = (x: number, y?: number) => {
  return x + (y || 0);
};
sum(1, 2); // 3
sum(1); // 1
sum(1, undefined); // 1
sum(1, null);// error:类型“null”的参数不能赋给类型“number | undefined”的参数。
```

从上面的例子可以看出，y作为可选参数，它的类型就不仅仅是number了，而是number和undefined的联合类型。

对可选属性也是类似的操作：

```ts
interface PositionInterface {
  x: number;
  y?: number;
}
const position: PositionInterface = {
  x: 12
};
// position.y = 'abc'; // error: 不能将类型“"abc"”分配给类型“number | undefined”。
position.y = undefined; // 正常
// position.y = null; // error: 不能将类型“null”分配给类型“number | undefined”
```

当我们开启`strictNullChecks`的时候，有些情况下编译器无法在我们声明变量之前知道一个值是否为null，所以需要使用类型断言手动指明该值不为null。

```ts
function getSplicedStrError(num: number | null): string {
  function getRes(prefix: string) {
    return prefix + num.toFixed(); // error 对象可能为 "null"。
  }
  num = num || 0.1;
  return getRes('James');
}
```

因为有嵌套函数，编译器无法去除嵌套函数的null，所以需要使用显式赋值断言：

```ts
function getSplicedStr(num: number | null): string {
  function getRes(prefix: string) {
    return prefix + num!.toFixed(); // 使用显式赋值断言
  }
  num = num || 0.1;
  return getRes('James');
}
```

#### 类型别名和字面量类型

1、类型别名

类型别名就是给类型起一个其它的名字，之后要用到这个类型的地方，都可以使用这个名字来代替。

```ts
// 类型别名
type TypeString = string;
let str: TypeString;
str = 123; // error： 不能将类型“123”分配给类型“string”
str = 'abc';
```

```ts
// 泛型
type PositionType<T> = {
  x: T,
  y: T
};
const position1: PositionType<number> = {
  x: 1,
  y: -1
};
const position2: PositionType<string> = {
  x: 'left',
  y: 'top'
};
```

```ts
// 接口和类型别名
type Alias = {
  num: number;
}
interface Interface {
  num: number;
}
let aliasDemo: Alias = {
  num: 0
};
let interfaceDemo: Interface = {
  num: 0
};
aliasDemo = interfaceDemo; // 可以互相赋值
```

2、字面量类型

注意字符串字面量类型和字符串类型的区别。

字符串字面量类型就是字符串常量，是具体的值：

```ts
type Name = 'James';
const name1: Name = 'ts'; // 报错 不能将类型“"ts"”分配给类型“"James"”
const name2: Name = 'James'; // 正常
```

可以使用联合类型来使用多个字符串：

```ts
type Direction = 'north' | 'east' | 'south' | 'west';
var getDirectionPrefix = function(direction: Direction) {
  return direction[0].toUpperCase();
}
getDirectionPrefix('test'); // 报错 类型“"test"”的参数不能赋给类型“Direction”的参数
getDirectionPrefix('west'); // W
```

数字字面量类型也是具体的值：

```ts
type Age = 18;
interface Info {
  name: string,
  age: Age
};
const info: Info = {
  name: 'James',
  // age: 20 // 报错 不能将类型“20”分配给类型“18”
  age: 18
}
```

有一个常见的逻辑错误：

```ts
var getValue = function(index: number) {
  if(index !== 0 || index !== 1) { 
    // his condition will always return 'true' since the types '0' and '1' have no overlap.
    // do something
  }
}
```

当index!==0不成立时，说明index就是常量0，此时后面的判断没有意义；当index!==0成立时，后面不会去进行判断。

值得一提的是，这一类错误只有TS中会提醒你，如果是JS，你只有把项目跑起来才能知道你写得有问题。

#### 可辨识联合

我们可以把单例类型（符合单例模式的数据类型，例如字面量类型）、联合类型、类型保护和类型别名这几种类型合并，来创建一个叫做`可辨识类型`的高级类型。

可辨识联合类型有两个要素：

 - 具有普通的单例类型属性（重要因素）
 - 一个类型别名，包含了那些类型的联合，即把几个类型封装为联合类型，并起一个别名

例子如下：

```ts
interface Square {
  kind: 'square'; // 具有辨识性的属性
  size: number
}
interface Rectangle {
  kind: 'rectangle'; // 具有辨识性的属性
  height: number;
  width: number
}
interface Circle {
  kind: 'circle'; // 具有辨识性的属性
  radius: number
}
type Shape = Square | Rectangle | Circle; // 三个接口组成一个联合类型，使用别名Square
var getArea = function(s: Shape): number{
  switch (s.kind) {
    case 'square': 
      return s.size * s.size;
    case 'rectangle':
      return s.height * s.width;
    case 'circle':
      return Math.PI * s.radius * s.radius;
  }
}
```

我们对每一种情况都进行详细的操作，但是，如果我们少写一个case，编辑器应该报错提醒，但是目前来看，没有。我们可以使用strictNullChecks，如果我们在上面的case里没有处理circle，就会返回undefined。不过这种方法是在2.0版本中新增的，对于旧版本可能无法支持。

```ts
// 把上面的case circle注释掉，就会报错
getArea({
  kind: 'circle',
  radius: 5
});
```

我们可以使用never类型来解决这个问题。

```ts
var assertNever = function (value: never) {
  throw new Error('Unexpected object: ' + value)
};
var getArea = function(s: Shape): number {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.height * s.width;
    case 'circle':
      return Math.PI * s.radius * s.radius;
    default: 
      return assertNever(s); // error
  };
}
```

使用这种方式，需要定义一个额外的assertNever函数，这种方法在编译和运行阶段都会进行遗漏提示。


