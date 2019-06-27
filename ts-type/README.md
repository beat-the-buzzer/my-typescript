### Typescript类型

#### JS中见过的类型

1、布尔类型

```ts
let bool: boolean = false;
bool = true;
bool = '123'; // 直接报错
```

2、数字类型

```ts
let num: number = 0;
num = '0'; // 报错
num = 0xFFF; // 十六进制数字
```

3、字符串类型

```ts
let str: string = 'hello';
str = 'world';
str = 0;
console.log(str);
```

```ts
let strLiteral: 'hello' | 'world';
strLiteral = 'hello';
strLiteral = 'hello world'; // 字符串字面量类型 报错
```

4、数组类型

```ts
let list1: number[] = [1, 2, 3]; // 数字类型的数组声明
let list2: Array<number> = [1, 2, 3]; // 数字类型的数组声明2
let list3: (number | string)[] = [1, '2', 3]; // 数组元素是数字或者字符串的数组声明
list3.push({}); // 报错
```

5、null和undefined

```ts
let u: undefined = undefined;
let n: null = null;
```

6、object类型

```ts
let obj: object;
obj = {
  name: 'John'
};
obj = 0; // 报错
console.log(obj.name); // 报错，需要使用interface
// 使用场景：对象作为函数参数
function getKeys(obj: object) {
  return Object.keys(obj);
}
getKeys({ a: 'a' });
// getKeys(1); // 报错
```

7、symbol类型

#### TS中新增的类型

1、元组

```ts
let arr: [string, number, boolean];
arr = ['a', 2, true];
arr = ['1', 2, 3]; // 报错，类型错误
arr = ['1', 2]; // 报错，缺少元素
arr[0] = 'b'; // 对单一元素进行处理
arr[3] = '4'; // 报错 数组不允许越界（TS 2.6以后的版本）
arr[1].split(''); // 直接报错，数字类型没有split方法
```

```ts
// 2.6之后的版本，[string, number]类似与下面的实现
interface MyArr extends Array<number | string> {
  0: number;
  1: string;
  length: 2
}
```

2、枚举

```ts
enum Roles {
  SUPER_ADMIN, // 默认0
  ADMIN,
  USER
}
// 等价于
// enum Roles {
//   SUPER_ADMIN = 0, // 默认0
//   ADMIN = 1,
//   USER = 2
// }
const superadmin = Roles['SUPER_ADMIN'];
console.log(`超级管理员：${superadmin}`);
```

3、any

如果任何值都指定为any，那么typescript将失去它的意义

4、void

```ts
enum Roles {
  SUPER_ADMIN, // 默认0
  ADMIN,
  USER
}
```

5、never

```ts
const errorFunc = (msg: string): never => {
  throw new Error(msg);
}
```

6、unknown

> unknow类型是typescript 3.0新增的类型，表示未知的类型，但是和any有所区别：unknown相对于any是安全的。

如果我们指定一个值的类型是any，那么这个值算是“废了”，我们可以随意对其进行操作。

如果使用unknown，会去限制这个值的操作。具体的规则到后面会详细描述。

7、交叉类型

交叉类型就是多个类型的并集使用 & 连接

```ts
const merge = <T, U>(arg1: T, arg2: U): T & U => {
  let res = Object.assign({}, arg1, arg2);
  return res;
}
const info1 = {
  name: 'John'
};
const info2 = {
  age: 20
};
const info = merge(info1, info2);
console.log(info); // info
console.log(info.country); // 报错: 不存在country属性
```

8、联合类型

```ts
const getLength = (content: string | number): number => {
  if(typeof content === 'string') {
    return content.length;
  } else {
    return String(content).length;
  }
}
console.log(getLength(123)); // 3
console.log(getLength('abc')); // 3
```

9、使用类型断言

```ts
const getLength = (target: string | number): number => {
  if(target.length) { // 报错: Property 'length' does not exist on type 'string | number'.
    return target.length; // 报错
  } else {
    return target.toString().length;
  }
}
```

```ts
const getStrLength = (target: string | number): number => {
  if ((<string>target).length) {
    return (target as string).length; // tslint推荐语法，JSX中只能使用这种语法
  } else {
    return target.toString().length;
  }
}
```

