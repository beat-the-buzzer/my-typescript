// 类型断言
{
  const valueList = [123, 'abc'];
  const getRandomValue = () => {
    const number = Math.random() * 10; // 取一个0到10范围内的随机值
    if (number < 5) {
      return valueList[0];
    } else {
      return valueList[1];
    }
  }
  const item = getRandomValue();
  // if(item.length != null) { // 报错
  //   console.log(item.length); // 报错
  // } else {
  //   console.log(item.toFixed()); // 报错
  // }
  if ((<string>item).length != null) {
    console.log((<string>item).length);
  } else {
    console.log(item)
  }
}

// 自定义类型保护

const valueList = [123, 'abc'];
const getRandomValue = () => {
  const value = Math.random() * 10;
  if (value < 5) {
    return valueList[0];
  } else {
    return valueList[1];
  }
}
function isString(value: number | string): value is string {
  return typeof value === 'string'
}
const item = getRandomValue();
if (isString(item)) {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

// typeof 类型保护
if (typeof item === 'string') {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

{
  const valueList = [{}, () => { }];
  const getRandomValue = () => {
    const number = Math.random() * 10;
    if (number < 5) {
      return valueList[0];
    } else {
      return valueList[1];
    }
  }
  const res = getRandomValue();
  if (typeof res === 'object') {
    console.log(res.toString());
  } else {
    // console.log(res()); // 报错 无法调用类型缺少调用签名的表达式。类型“{}”没有兼容的调用签名。
  }
}

// instanceof 类型保护

class CreateByClass1 {
  public age = 18;
  constructor() { }
}
class CreateByClass2 {
  public name = 'James';
  constructor() { }
}
function getRandomItem() {
  return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2();
}
const citem = getRandomItem();
if (citem instanceof CreateByClass1) {
  console.log(citem.age);
} else {
  console.log(citem.name);
}



