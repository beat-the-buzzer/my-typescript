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

