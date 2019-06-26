// ES6中的Symbol
{
  const s = Symbol(); // 不能加new关键字
  typeof s; // symbol
}

{
  const s1 = Symbol('test');
  const s2 = Symbol('test');
  s1 === s2; // false //  symbol会返回一个独一无二的值，这个值和任何值都不同
}

{
  let s = Symbol('abc');
  console.log(s.toString()); // 'Symbol(abc)'
  console.log(Boolean(s)); // true
  console.log(!s); // false
}

// 作为属性名，保证属性的独一无二
{
  let name = Symbol();
  let obj = {
    [name]: 'John'
  };
  console.log(obj); // {Symbol(): "John"}
  console.log(obj[name]); // John
}

// 虚假的遍历方法
{
  // Symbol作为属性名，这个属性不会被for...in、Object.getOwnPropertyNames、JSON.stringfy获取到
  const name = Symbol('name');
  const obj = {
    [name]: 'John',
    age: 20
  };
  for(const key in obj) {
    console.log(key); // 打印出age
  }
  console.log(Object.keys(obj)); // ['age']
  console.log(Object.getOwnPropertyNames('obj')); // ['age']
  console.log(JSON.stringify(obj)); // '{"age": 20}'
}

// 真实的遍历方法
{
  const name = Symbol('name');
  const obj = {
    [name]: 'John',
    age: 20
  };
  const SymbolPropNames = Object.getOwnPropertySymbols(obj);
  console.log(SymbolPropNames); // [Symbol(name)]
  console.log(obj[SymbolPropNames[0]]); // 'John'
  console.log(Reflect.ownKeys(obj)); // ['age', Symbol(name)]
}

// symbol静态方法: Symbol.for
{
  const s1 = Symbol('a');
  const s2 = Symbol('a');
  const s3 = Symbol.for('a'); // 读取操作
  const s4 = Symbol.for('a');
  const s5 = Symbol.for('b'); // 新建操作
  const s6 = Symbol.for('b'); // 新建操作
  s3 === s4; // true
  s1 === s2; // false
  s5 === s6; // true
}

// symbol静态方法: Symbol.keyFor
{
  const sym = Symbol.for('John');
  console.log(Symbol.keyFor(sym)); // John
  // 传入Symbol，返回注册的键名
}