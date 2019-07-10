### Typescript泛型和类

#### 泛型

> 泛型是指在定义函数、接口和类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

1、基本用法

有些场景，我们不得不使用any，例如下面的例子：

```ts
const getArray = (value: any, times: number = 5): any => {
  return Array(times).fill(value);
} 
getArray('abc', 3).forEach((item: any) => {
  console.log(item.length);
});
getArray(2, 3).forEach((item: any) => {
  console.log(item.length); // 本来应该报错，但是却没有
});
```

这个函数是创建一个长度为times，每一项是value的数组。从逻辑上看，value是什么类型，数组中的所有元素就是什么类型。但是，有些时候，我们需要执行了getArray才知道这个数组里面的元素是什么类型的。所以，有一些本来应该报错的地方，由于类型是any，却没有报错。

所以我们需要使用泛型进行改造，改造完成之后，我们是在调用的时候去确定类型：

```ts
const getArray = <T>(value: T, times: number = 5): T => {
  return Array(times).fill(value);
}
getArray<string>('abc', 4).forEach(item => {
  console.log(item.length);
});
getArray<number>(123, 4).forEach(item => {
  console.log(item.length); // 这一行报错，number不存在属性length
})
```

因为TS有类型推断，所以我们也可以简写：

```ts
getArray(123, 4).forEach(item => {
  console.log(item.length); // 报错，类型推断
});
```

2、泛型变量

> 在处理泛型的时候，我们把T当做any来看

```ts
const getLength = <T>(param: T): number => {
  return param.length; // 报错： 类型T不存在属性length
}
```

多个泛型变量的情况：

```ts
const getArray = <T,U>(param1: T, param2: U, times: number): [T, U][] => {
  return Array(times).fill([param1, param2]);
}
getArray(1,'a',3).forEach(item => {
  console.log(item[0].length); // 报错：number不存在属性length
  console.log(item[1].toFixed(2)); // 报错：string不存在方法toFixed
});
```

3、泛型函数类型

泛型函数类型，简单定义

```ts
const getArray: <T>(arg: T, times: number) => T[] = (arg, times) => {
  return Array(times).fill(arg);
}
```

泛型函数类型，使用类型别名

```ts
type GetArray = <T>(ars: T, times: number) => T[];
const getArray: GetArray = <T>(arg: T, times: number): T[] => {
  return Array(times).fill(arg);
}
```

接口的形式定义泛型函数

```ts
interface GetArray {
  <T>(arg: T, times: number): T[]
}
const getArray: GetArray = <T>(arg: T, times: number): T[] => {
  return Array(times).fill(arg);
}
```

泛型变量提到最外层

```ts
interface GetArray<T> {
  (arg: T, times: number): T[];
}
const getArray: GetArray<number> = <T>(arg: T, times: number): T[] => {
  return Array(times).fill(arg);
}
getArray('a',1); // 报错，不能将类型"a"分配给number
```

4、泛型约束

我们使用泛型的时候，是把它当做any来使用的，所以有时候起不到约束类型的作用。我们可以约束泛型，例如，限制T必须要有length属性。

```ts
interface ValueWithLength {
  length: number;
}
const v: ValueWithLength = {}; // 报错，空对象没有length属性
const val: ValueWithLength = 'abc'; // 正常，字符串有length属性
const getLength = <T extends ValueWithLength>(param: T): number => {
  return param.length;
}
getLength('abc');
getLength(123); // 报错
getLength({length: 3});
getLength([1,2,3]);
```

泛型约束中使用类型参数

我们有时候访问了对象上不存在的属性

```js
const getProps = (obj, props) => {
  return obj[props];
}
const obj = { a: 'aa', b: 'bb' };
getProps(obj, 'c'); // undefined
```

我们可以对其检查：

```ts
const getProps = <T, K extends keyof T>(obj: T, props: K) => {
  return obj[props];
}
const obj = { a: 'aa', b: 'bb' };
getProps(obj, 'c'); // 报错
```

#### TS中的类

1、基础用法

```ts

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  getPosition() {
    return `(${this.x}, ${this.y})`;
  }
}
const point = new Point(1, 2);
```

2、实现继承

```ts
class Parent {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name: string) {
    super(name);
  }
}
```

3、public修饰符

public就是公共的，可以通过实例去访问的属性或者方法

```ts
class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public getPosition () {
    return `(${this.x}, ${this.y})`;
  }
}
```

4、private修饰符

private是私有属性，在类定义的外面无法访问

```ts
class Parent {
  private age: number;
  constructor(age: number) {
    this.age = age;
  }
}
const p = new Parent(18);
console.log(p); // { age: 18 }
console.log(p.age); // 报错
console.log(Parent.age); // 报错
class Child extends Parent {
  constructor(age: number) {
    super(age);
    console.log(super.age); // 报错，只能访问public和protected属性
  }
}
```

5、protected修饰符

protected修饰的成员在继承该类的子类中可以访问。

```ts
class Parent {
  protected age: number;
  constructor(age: number) {
    this.age = age;
  }
  protected getAge() {
    return this.age;
  }
}
const p = new Parent(18);
console.log(p); // { age: 18 }
console.log(p.age); // 报错
console.log(Parent.age); // 报错
class Child extends Parent {
  constructor(age: number) {
    super(age);
    console.log(super.age); // 报错，只能访问public和protected属性
    console.log(super.getAge);
  }
}
new Child(18);
```

使用protected修饰constructor

```ts
class Parent {
  protected constructor() {

  }
}
const p = new Parent(); // 报错
class Child extends Parent {
  constructor() {
    super();
  }
}
const c = new Child();
```

6、readonly修饰符

readonly可以将属性设置为只读

```ts
class UserInfo {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const user = new UserInfo('James');
// user.name = 'LI'; // 报错，只读属性不可修改
```

7、参数属性

在constructor的参数里面添加访问限定符，可以在constructor中省略赋值操作

```ts
class A {
  constructor(name: string) {

  }
}
const a = new A('hehe');
console.log(a.name); // 报错
class B {
  constructor(public name: string) {
  }
}
const b = new B('haha');
console.log(b.name); // hehe
```

8、静态属性static

实例不会添加静态属性，也不会继承静态方法

```ts
class Parent {
  public static age: number = 18;
  public static getAge() {
    return this.age;
  }
  constructor() {

  }
}
const p = new Parent();
console.log(p.age); // 报错
console.log(Parent.age); // 18
```

9、可选类属性

和对象的定义类似，类也使用?表示可选属性

```ts
class Info {
  name: string;
  age?: number;
  constructor(name: string, age?: number, public sex? : string) {
    this.name = name;
    this.age = age;
  }
}
const info1 = new Info('James');
const info2 = new Info('James', 18);
const info3 = new Info('James', 18, 'male');
```

10、get/set存取

类似ES6的写法

```ts
class UserInfo {
  private _fullName: string = '';
  constructor () {}
  get fullName () {
    return this._fullName;
  }
  set fullName (value) {
    console.log('setter:' + value);
    this._fullName = value;
  }
}
const user = new UserInfo();
user.fullName = 'LB J'; // setter: LB J
console.log(user.fullName); // 'LB J'
```