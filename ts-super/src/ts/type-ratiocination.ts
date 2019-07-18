// 基本的类型推论
{
  let name = "hello";
  // name = 123; // error 不能将类型“123”分配给类型“string”
  let arr = [1, 'a'];
  // arr = ['b', 0, false]; // error 不能将类型“false”分配给类型“string | number”
  let value = Math.random() * 10 > 5 ? 'abc' : 123;
  // value = false; // error 不能将类型“false”分配给类型“string | number”
}

// 上下文类型
{
  window.onmousedown = function(e) {
    // console.log(e.a); // error 类型"mouseEvent"上不存在属性"a"
  }
}
