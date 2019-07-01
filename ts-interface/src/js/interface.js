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

// 剩余参数
{
  function handleData() {
    if (arguments.length === 1) {
      return arguments[0] * 2;
    } else if (arguments.length === 2) {
      return arguments[0] * arguments[1];
    } else {
      return [].slice.call(arguments).join('_');
    }
  }

  handleData(2); // 4
  handleData(2, 3); // 6
  handleData(1, 2, 3, 4, 5); // '1_2_3_4_5'
}
