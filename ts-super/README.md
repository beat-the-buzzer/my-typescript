## Typescript高级用法

#### 类型推论

在一些定义中如果没有明确指定类型，编辑器会自动推断出合适的类型。

```ts
let name = "hello";
name = 123; // error 不能将类型“123”分配给类型“string”
```