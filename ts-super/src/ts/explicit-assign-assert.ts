// 显式赋值断言

// null undefined
{
  let str = 'James';
  // str = null; // error: 不能将类型“null”分配给类型“string”。
  let strNull: string | null = 'James';
  strNull = null;
  // strNull = undefined; // error: 不能将类型“undefined”分配给类型“string | null”。
}

// 可选参数
{
  const sum = (x: number, y?: number) => {
    return x + (y || 0);
  };
  sum(1, 2); // 3
  sum(1); // 1
  sum(1, undefined); // 1
  // sum(1, null);// error:类型“null”的参数不能赋给类型“number | undefined”的参数。
}

// 可选属性
{
  interface PositionInterface {
    x: number;
    y?: number;
  }
  const position: PositionInterface = {
    x: 12
  };
  // position.y = 'abc'; // error: 不能将类型“"abc"”分配给类型“number | undefined”。
  position.y = undefined; // 正常
  // position.y = null; // error: 不能将类型“null”分配给类型“number | undefined”
}

// 显式赋值断言
function getSplicedStrError(num: number | null): string {
  function getRes(prefix: string) {
    return prefix + num.toFixed(); // error 对象可能为 "null"。
  }
  num = num || 0.1;
  return getRes('James');
}

function getSplicedStr(num: number | null): string {
  function getRes(prefix: string) {
    return prefix + num!.toFixed(); // 使用显式赋值断言
  }
  num = num || 0.1;
  return getRes('James');
}
