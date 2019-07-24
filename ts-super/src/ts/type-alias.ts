// 类型别名
{
  type TypeString = string;
  let str: TypeString;
  // str = 123; // error： 不能将类型“123”分配给类型“string”
  str = 'abc';
}

// 泛型
{
  type PositionType<T> = {
    x: T,
    y: T
  };
  const position1: PositionType<number> = {
    x: 1,
    y: -1
  };
  const position2: PositionType<string> = {
    x: 'left',
    y: 'top'
  };
}

// 接口和类型别名
{
  type Alias = {
    num: number;
  }
  interface Interface {
    num: number;
  }
  let aliasDemo: Alias = {
    num: 0
  };
  let interfaceDemo: Interface = {
    num: 0
  };
  aliasDemo = interfaceDemo; // 可以互相赋值
}

// 字面量类型
{
  type Name = 'James';
  // const name1: Name = 'ts'; // 报错 不能将类型“"ts"”分配给类型“"James"”
  const name2: Name = 'James'; // 正常
}

// 联合类型
{
  type Direction = 'north' | 'east' | 'south' | 'west';
  var getDirectionPrefix = function(direction: Direction) {
    return direction[0].toUpperCase();
  }
  // getDirectionPrefix('test'); // 报错 类型“"test"”的参数不能赋给类型“Direction”的参数
  getDirectionPrefix('west'); // W
}

// 数字字面量类型
{
  type Age = 18;
  interface Info {
    name: string,
    age: Age
  };
  const info: Info = {
    name: 'James',
    // age: 20 // 报错 不能将类型“20”分配给类型“18”
    age: 18
  }
}

// 常见的逻辑错误
{
  var getValue = function(index: number) {
    if(index !== 0 && index !== 1) { 
    // if(index !== 0 || index !== 1) { 
      // his condition will always return 'true' since the types '0' and '1' have no overlap.
      // do something
    }
  }
}