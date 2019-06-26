// 使用花括号，指定作用域
{
  /*
  * 布尔类型
  */
  let bool: boolean = false;
  bool = true;
  // bool = '123'; // 直接报错
  console.log(bool);

  /*
  * 数字类型
  */
  let num: number = 0;
  // num = '0'; // 报错
  num = 0xFFF; // 十六进制数字
  console.log(num);

  /*
  * 字符串类型
  */
  let str: string = 'hello';
  str = 'world';
  // str = 0; // 报错
  console.log(str);

  /**
  * 字符串字面量
  */
  let strLiteral: 'hello' | 'world';
  strLiteral = 'hello';
  // strLiteral = 'hello world'; // 报错
  console.log(strLiteral);

  /**
  * 数组类型
  */
  let list1: number[] = [1, 2, 3]; // 数字类型的数组声明
  let list2: Array<number> = [1, 2, 3]; // 数字类型的数组声明2
  let list3: (number | string)[] = [1, '2', 3]; // 数组元素是数字或者字符串的数组声明
  // list3.push({}); // 报错
  console.log(list3);

  /*
  * null undefined
  */
  let u: undefined = undefined;
  let n: null = null;

  /*
  * object类型
  */
  let obj: object;
  obj = {
    name: 'John'
  };
  // obj = 0; // 报错
  // console.log(obj.name); // 报错，需要使用interface

  // 使用场景
  var getKeys = function (obj: object) {
    return Object.keys(obj);
  }
  console.log(getKeys({ a: 'a' }));
  // getKeys(1); // 报错

  /**
  * symbol类型
  */
  let sym: symbol = Symbol();
  // TS 2.7新增 只可以用于常量的定义或者属性名，且必须要是const
  const key1: unique symbol = Symbol();
  let key2: symbol = Symbol();
  const objSym = {
    [key1]: 'value1',
    [key2]: 'value2'
  };
  console.log(objSym[key1]);
  // console.log(objSym[key2]); // symbol不能作为索引

  // const getLength = (target: string | number): number => {
  //   if(target.length) { // 报错: Property 'length' does not exist on type 'string | number'.
  //     return target.length;
  //   } else {
  //     return target.toString().length;
  //   }
  // }

  const getStrLength = (target: string | number) : number => {
    if ((<string> target).length) {
      return (target as string).length; // tslint推荐语法，JSX中只能使用这种语法
    } else {
      return target.toString().length;
    }
  }
}