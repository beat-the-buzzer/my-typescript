// 可辨识联合类型
{
  interface Square {
    kind: 'square'; // 具有辨识性的属性
    size: number
  }
  interface Rectangle {
    kind: 'rectangle'; // 具有辨识性的属性
    height: number;
    width: number
  }
  interface Circle {
    kind: 'circle'; // 具有辨识性的属性
    radius: number
  }
  type Shape = Square | Rectangle | Circle; // 三个接口组成一个联合类型，使用别名Square
  var getArea = function(s: Shape): number {
    switch (s.kind) {
      case 'square': 
        return s.size * s.size;
      case 'rectangle':
        return s.height * s.width;
      case 'circle': // 试着删掉这段case
        return Math.PI * s.radius * s.radius;
    }
  }
  getArea({
    kind: 'circle',
    radius: 5
  });
}

// never类型
{
  interface Square {
    kind: 'square'; // 具有辨识性的属性
    size: number
  }
  interface Rectangle {
    kind: 'rectangle'; // 具有辨识性的属性
    height: number;
    width: number
  }
  interface Circle {
    kind: 'circle'; // 具有辨识性的属性
    radius: number
  }
  type Shape = Square | Rectangle | Circle; // 三个接口组成一个联合类型，使用别名Square
  var assertNever = function (value: never) {
    throw new Error('Unexpected object: ' + value)
  };
  var getAreaNew = function(s: Shape): number {
    switch (s.kind) {
      case 'square':
        return s.size * s.size;
      case 'rectangle':
        return s.height * s.width;
      case 'circle':
        return Math.PI * s.radius * s.radius;
      default: 
        return assertNever(s); // error
    };
  }
}

