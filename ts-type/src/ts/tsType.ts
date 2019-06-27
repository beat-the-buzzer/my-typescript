{
  /**
  * 元组 
  */
  let arr: [string, number, boolean];
  arr = ['a', 2, true];
  // arr = ['1', 2, 3]; // 报错，类型错误
  // arr = ['1', 2]; // 报错，缺少元素
  arr[0] = 'b'; // 对单一元素进行处理
  // arr[3] = 'b'; // 数组不允许越界（TS 2.6以后的版本）
  // arr[1].split(''); // 直接报错，数字类型没有split方法
  console.log(arr);

  // 2.6之后的版本，[string,number]类似与下面的实现
  interface MyArr extends Array<number | string> {
    0: number;
    1: string;
    length: 2;
  }

  // let myArr: MyArr = [0, '1', '3']; // 报错，数组越界
  let myArr: MyArr = [0, '1'];
  console.log(myArr.length);
}

{
  /**
  *  枚举类型
  */
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
}

{
  /*
  * void
  */
  // 没有返回值的函数是void类型，和C++类似 
  const consoleText = (text: string): void => {
    console.log(text);
  }
  consoleText('hello world');
}

{
  /*
  * never
  */
  const errorFunc = (msg: string): never => {
    throw new Error(msg);
  }
  // errorFunc('Syntax Error: You must be out of mind!')
}

{
  /*
  * 交叉类型
  */
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
  // console.log(info.country); // 报错: 不存在country属性
}

{
  /*
  * 联合类型
  */
  const getLength = (content: string | number): number => {
    if (typeof content === 'string') {
      return content.length;
    } else {
      return String(content).length;
    }
  }
  console.log(getLength(123)); // 3
  console.log(getLength('abc')); // 3
}

{
  /*
  * 类型断言
  */

  // const getLength = (target: string | number): number => {
  //   if(target.length) { // 报错: Property 'length' does not exist on type 'string | number'.
  // 	  return target.length; // 报错
  //   } else {
  // 	  return target.toString().length;
  //   }
  // }
  const getStrLength = (target: string | number): number => {
    if ((<string>target).length) {
      return (target as string).length; // tslint推荐语法，JSX中只能使用这种语法
    } else {
      return target.toString().length;
    }
  }
}