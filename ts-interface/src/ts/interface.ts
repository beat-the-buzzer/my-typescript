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