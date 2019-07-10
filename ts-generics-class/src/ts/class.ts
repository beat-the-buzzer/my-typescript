import { Agent } from "http";

// 简单的例子
{
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
}

// 实现继承
{
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
}

// public
{
  class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    public getPosition() {
      return `(${this.x}, ${this.y})`;
    }
  }
}

// private
{
  class Parent {
    private age: number;
    constructor(age: number) {
      this.age = age;
    }
  }
  const p = new Parent(18);
  console.log(p); // { age: 18 }
  // console.log(p.age); // 报错
  // console.log(Parent.age); // 报错
  class Child extends Parent {
    constructor(age: number) {
      super(age);
      // console.log(super.age); // 报错，只能访问public和protected属性
    }
  }
}

// protected
{
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
  // console.log(p.age); // 报错
  // console.log(Parent.age); // 报错
  class Child extends Parent {
    constructor(age: number) {
      super(age);
      // console.log(super.age); // 报错，只能访问public和protected属性
      console.log(super.getAge);
    }
  }
  new Child(18);
}

// protected修饰constructor
{
  class Parent {
    protected constructor() {

    }
  }
  // const p = new Parent(); // 报错
  class Child extends Parent {
    constructor() {
      super();
    }
  }
  const c = new Child();
}

// readonly
{
  class UserInfo {
    readonly name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  const user = new UserInfo('James');
  // user.name = 'LI'; // 报错，只读属性不可修改
}

// 参数属性
{
  class A {
    constructor(name: string) {

    }
  }
  const a = new A('hehe');
  // console.log(a.name); // 报错
  class B {
    constructor(public name: string) {

    }
  }
  const b = new B('haha');
  console.log(b.name); // hehe
}

// static 静态属性
{
  class Parent {
    public static age: number = 18;
    public static getAge() {
      return this.age;
    }
    constructor() {

    }
  }
  const p = new Parent();
  // console.log(p.age); // 报错
  console.log(Parent.age); // 18
}

// 可选属性
{
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
}

// get/set 存取
{
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
}