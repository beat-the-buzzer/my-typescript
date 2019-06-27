// 使用TS进行类型校验
{
  const getFullName = ({
    firstName,
    lastName
  }: {
    firstName: string,
    lastName: string
  }): string => `${firstName} ${lastName}`
  getFullName({ firstName: 'LB', lastName: 'J' }); // LB J
  // getFullName({ age: '18', phone: 'xxxxxxxxxxx' }); // 提前报错
  // getFullName({ firstName: 'LB' }); // 提前报错
  // getFullName(); // 提前报错：应有一个参数，但获得0个
}

// 写一个interface
{
  interface Info {
    firstName: string;
    lastName: string;
  }
  const getFullName = ({ firstName, lastName }: Info) => `${firstName} ${lastName}`;
  getFullName({ firstName: 'LB', lastName: 'J' }); // LB J
  // getFullName({ age: '18', phone: 'xxxxxxxxxxx' }); // 提前报错
  // getFullName({ firstName: 'LB' }); // 提前报错
  // getFullName(); // 提前报错：应有一个参数，但获得0个
}

// 可选参数
{
  interface NickName {
    firstName?: string,
    lastName: string,
  }
  const getNickName = ({ firstName, lastName }: NickName) => `${firstName ? firstName : ''} ${lastName}`
  getNickName({ lastName: 'James' }); // 正常
  // getNickName({ lastName: 'James', age: 20 }); // 多余属性报错
}

// 绕开多余属性检查1: 类型断言
{
  interface NickName {
    firstName?: string,
    lastName: string,
  }
  const getNickName = ({ firstName, lastName }: NickName) => `${firstName ? firstName : ''} ${lastName}`
  getNickName({ lastName: 'James' }); // 正常
  getNickName({ lastName: 'James', age: 20 } as NickName); // 使用了类型断言，不会报错
}

// 绕开多余属性检查2: 索引签名
{
  interface NickName {
    firstName?: string,
    lastName: string,
    [prop: string]: any,
  }
  const getNickName = ({ firstName, lastName }: NickName) => `${firstName ? firstName : ''} ${lastName}`
  getNickName({ lastName: 'James' }); // 正常
  getNickName({ lastName: 'James', age: 20 }); // 使用了索引签名，不会报错
}

// 只读属性
{
  interface Role {
    readonly 0: string,
    readonly 1: string
  }
  const role: Role = {
    0: 'Super_Admin',
    1: 'Admin'
  };
  // role[1] = 'Top_Admin'; // 报错 这是只读属性，不可以修改
}

// 只读属性和const
{
  const NAME: string = 'John';
  // NAME = ''; // 报错，不允许修改常量
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
  // info.name = 'Junes'; // 报错 不可以修改只读属性
}

// 使用接口描述函数
{
  interface AddFunc {
    (num1: number, num2: number): number;
  }
  const add: AddFunc = (n1, n2) => n1 + n2;
  // add(1); // 报错
  // add(1, 2, 3); // 报错
  // add(1, '2'); // 报错
  add(1, 2); // 正确
  // const join: AddFunc = (n1, n2) => `${n1}${n2}`; // 报错 返回值是string
}