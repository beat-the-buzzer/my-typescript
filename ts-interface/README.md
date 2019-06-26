### Typescript接口

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

