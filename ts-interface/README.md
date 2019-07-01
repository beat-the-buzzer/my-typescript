### Typescript接口

JS代码在浏览器里面运行的都时候，最好把{}带上，给代码块增加作用域限制（ES6写法）。

TS每个代码块都加了{}，解决了let、const重复的问题。

> 使用接口可以定义几乎任意结构。

#### 为什么使用接口

例子：我们写一个简单的函数，参数是一个对象，里面包含firstName和LastName，返回一个完整的名字。

```js
const getFullName = ({firstName,lastName}) => `${firstName} ${lastName}`
getFullName({firstName: 'LB', lastName: 'J'});
```

上面的代码貌似没有毛病，但是如果我们不按规则传参数，就会得到不想得到的值，甚至会报错中止程序。

```js
getFullName({ firstName: 'LB', lastName: 'J' }); // LB J
getFullName({ age: 18, phone: 'xxxxxxxxxxx' }); // "undefined undefined"
getFullName({ firstName: 'LB' }); // "LB undefined"
getFullName(); // Uncaught TypeError: Cannot destructure property `firstName` of 'undefined' or 'null'.
```

我们可以使用ts对其进行优化改造，这样很多问题就能提前发现：

```ts
const getFullName = ({
  firstName,
  lastName
}: {
  firstName: string,
  lastName: string
}): string => `${firstName} ${lastName}`
getFullName({ firstName: 'LB', lastName: 'J' }); // LB J
getFullName({ age: '18', phone: 'xxxxxxxxxxx' }); // 提前报错
getFullName({ firstName: 'LB' }); // 提前报错
getFullName(); // 提前报错：应有一个参数，但获得0个
```

很显然，当传入的参数比较复杂的时候，我们需要一项一项对其进行属性设置，很麻烦，并且可读性低。我们可以使用ts的interface对其进行接口声明。

#### 如何使用interface

先重写一下上面的例子：

```ts
interface Info {
  firstName: string;
  lastName: string;
}
const getFullName = ({ firstName, lastName }: Info) => `${firstName} ${lastName}`;
getFullName({ firstName: 'LB', lastName: 'J' }); // LB J
getFullName({ age: '18', phone: 'xxxxxxxxxxx' }); // 提前报错
getFullName({ firstName: 'LB' }); // 提前报错
getFullName(); // 提前报错：应有一个参数，但获得0个
```

我们在定义接口的时候，并不是在定义一个对象，而是在{}里面声明类型，就像Java、C++里面先声明`int info;`一样;{}里面可以使用逗号和分号。

显然，我们定义了这个interface之后，不仅仅是这一个函数，其它函数都可以使用这个interface。

#### interface的可选属性

我们经常会定义一些非必传字段，同样在接口里面也可以进行定义。

```js
// JS
const getNickName = ({ firstName, lastName }) => `${firstName ? firstName : ''} ${lastName}`;
```

```ts
interface NickName {
  firstName?: string,
  lastName: string,
}
const getNickName = ({ firstName, lastName }: NickName) => `${firstName ? firstName : ''} ${lastName}`;
getNickName({ lastName: 'James' }); // 正常，不会报错
getNickName({ lastName: 'James', age: 20 }); // 多余属性报错，会对多余属性进行检查
```

#### 绕开多余属性检查

上面的例子里，对多余属性也进行了检查。但事实上，对于多余的属性，我们并不是需要关心是否传了这个值，因为这个值在代码里没有用到（显然，代码里用到的就不叫多余属性了）。所以，我们可能会去绕开对多余属性的检查。

 - 方法1： 类型断言

```ts
interface NickName {
  firstName?: string,
  lastName: string,
}
const getNickName = ({ firstName, lastName }: NickName) => `${firstName ? firstName : ''} ${lastName}`
getNickName({ lastName: 'James' }); // 正常
getNickName({ lastName: 'James', age: 20 } as NickName); // 使用了类型断言，不会报错
```

 - 方法2：索引签名
```ts
interface NickName {
  firstName?: string,
  lastName: string,
  [prop: string]: any,
}
const getNickName = ({ firstName, lastName }: NickName) => `${firstName ? firstName : ''} ${lastName}`
getNickName({ lastName: 'James' }); // 正常
getNickName({ lastName: 'James', age: 20 }); // 使用了索引签名，不会报错
```

#### 只读属性

```ts
const NAME: string = 'John';
NAME = ''; // 报错，不允许修改常量
const obj = {
  name: 'John'
};
obj.name = 'Junes'; // 操作属性 不会报错

interface Info {
  readonly name: string
}

const info: Info = {
  name: 'John'
};
info.name = 'Junes'; // 报错 不可以修改只读属性
```

#### 描述函数

```ts
interface AddFunc {
  (num1: number, num2: number): number;
}
const add: AddFunc = (n1, n2) => n1 + n2;
add(1); // 报错
add(1, 2, 3); // 报错
add(1, '2'); // 报错
add(1, 2); // 正确
const join: AddFunc = (n1, n2) => `${n1}${n2}`; // 报错 返回值是string
```

AddFunc结构，必须包含一个和结构里定义的函数一样参数、一样返回值的方法，或者这个值就是符合这个函数要求的函数。花括号里面的叫做`调用签名`。

#### 接口的高级用法

1、索引类型

```ts
interface RoleDic {
  [id: number]: string;
}

const role1: RoleDic = {
  0: 'super_admin',
  1: 'admin'
};
const role2: RoleDic = {
  a: 'admin' // 报错，索引必须要是数字类型
}
const role3: RoleDic = ['admin', 'super_admin']; // 不会报错
```

2、继承接口

原先的需求：

```ts
interface Vegetables {
  color: string;
}
interface Tomato {
  color: string;
  radius: number;
}
interface Carrot {
  color: string;
  length: number;
}
```

使用继承的方式：

```ts
interface Vegetables {
  color: string;
}
interface Tomato extends Vegetables {
  radius: number;
}
interface Carrot extends Vegetables {
  length: number;
}
const tomato: Tomato = {
  radius: 1.2 // error  Property 'color' is missing in type '{ radius: number; }'
};
const carrot: Carrot = {
  color: "orange",
  length: 20
};
```

多继承：

```ts
interface Vegetables {
  color: string;
}
interface Food {
  type: string;
}
interface Tomato extends Food, Vegetables {
  radius: number;
}

const tomato: Tomato = {
  type: "vegetables",
  color: "red",
  radius: 1.2
};
```

3、混合类型接口

把函数赋值给countUp，并且在上面绑定一个属性。

```js
// javascript
let countUp = () => {
  return ++countUp.count;
};
countUp.count = 0;
console.log(countUp()); // 1
console.log(countUp()); // 2
```

```ts
interface Counter {
  (): void; // 这里定义Counter这个结构必须包含一个函数，函数的要求是无参数，返回值为void，即无返回值
  count: number; // 而且这个结构还必须包含一个名为count、值的类型为number类型的属性
}
const getCounter = (): Counter => { // 这里定义一个函数用来返回这个计数器
  const c = () => { // 定义一个函数，逻辑和前面例子的一样
    c.count++;
  };
  c.count = 0; // 再给这个函数添加一个count属性初始值为0
  return c; // 最后返回这个函数对象
};
const counter: Counter = getCounter(); // 通过getCounter函数得到这个计数器
counter();
console.log(counter.count); // 1
counter();
console.log(counter.count); // 2
```

#### 为函数和函数参数定义类型

1、为函数定义类型

```ts
// 正常定义函数
function add(arg1: number, arg2: number): number {
  return arg1 + arg2
}
// 或者
const add = (arg1: number, arg2: number): number => arg1 + arg2;
```

```ts
// 使用接口定义函数
interface Add {
  (x: number, y: number): number
}
let add: Add = (arg1, arg2) => arg1 + arg2;
add(1,'2'); // 报错 类型不对
add(1, 2, 3); // 报错，参数数量不对
add(1, 2); // 3
```

```ts
// 使用类型别名
type Add = (x: number, y: number) => number;
let add: Add = (args1: string, args2: string):string => args1 + args2; // 报错，类型错误
let add: Add = (arg1: number, arg2: number) => arg1 + arg2;
add(1,'2'); // 报错 类型不对
add(1, 2, 3); // 报错，参数数量不对
add(1, 2); // 3
```

2、为函数的参数定义类型

 - 可选参数（注意位置）

 ```ts
 type Add = (x?: number, y: number) => number; // 报错，必选参数不能位于可选参数后面
 ```

 - 默认参数 

  ES6之前，我们都是在函数内部判断有没有传参数，如果没传，就给一个默认值。ES6提供了更加优雅的方式实现：

  ```js
  const count = 0;
  const countUp = (step = 1) => {
    count+= step;
  }
  ```

  TS会识别默认参数的类型，也就是类型推论：

  ```ts
  const add = (x: number, y = 2): number => x + y;
  add(1, '2'); // 报错，类型不对
  ```

 - 剩余参数
  
  下面的例子，传入不同数量参数，进行不同的操作：

  ```js
  // ES5
  function handleData() {
    if (arguments.length === 1) {
      return arguments[0] * 2;
    } else if (arguments.length === 2) {
      return arguments[0] * arguments[1];
    } else {
      return [].slice.call(arguments).join('_');
    }
  }
  handleData(2); // 4
  handleData(2, 3); // 6
  handleData(1, 2, 3, 4, 5); // '1_2_3_4_5'
  ```

  ```js
  // ES6
  const handleData = (arg1, ...args) => {
    // ... 省略逻辑
  }
  handleData(1, 2, 3, 4, 5); // '1_2_3_4_5'
  ```

  ```ts
  const handleData = (arg1: number, ...args: number[]) => {
    if (args.length === 0) {
      return arg1 * 2;
    } else if (args.length === 1) {
      return arg1 * args[0];
    } else {
      return [arg1, ...args].join('_');
    }
  }
  handleData(1, 2, 3, 4, 5); // '1_2_3_4_5'
  ```
