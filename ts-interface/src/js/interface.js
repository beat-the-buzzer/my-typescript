// 不使用TS的情况，在使用getFullName的时候，会因为参数传递错误而报错
{
  const getFullName = ({ firstName, lastName }) => `${firstName} ${lastName}`;
  getFullName({ firstName: 'LB', lastName: 'J' }); // LB J
  getFullName({ age: 18, phone: 'xxxxxxxxxxx' }); // "undefined undefined"
  getFullName({ firstName: 'LB' }); // "LB undefined"
  getFullName(); // Uncaught TypeError: Cannot destructure property `firstName` of 'undefined' or 'null'.
}

// 可选参数
{
  const getNickName = ({ firstName, lastName }) => `${firstName ? firstName : ''} ${lastName}`;
  // firstName不传也是可以的
}
