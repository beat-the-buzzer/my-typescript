// 枚举类型深入学习
{
  console.log('深入学习枚举：');

  // 默认0 递增
  enum Status {
    Uploading, // 默认0
    Success,
    Failed
  };
  console.log(Status.Uploading);
  console.log(Status.Success);
  console.log(Status['Failed']);

  // 自己设置
  enum HttpStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
  };
  console.log(HttpStatus.Success, HttpStatus.NotFound, HttpStatus.Error);

  // 部分递增 + 反向映射
  enum Status {
    OK = 200,
    Created,
    Accepted,
    BadRequest = 400,
    Unauthorized
  };
  console.log(Status);
  // TypeScript定义的枚举，编译出来之后就是对象，并且{[key]:value,[value]: key}

  const getValue = () => 0;
  enum ErrorIndex {
    a = getValue(),
    // b, // 报错：枚举类型必须要有初始化表达式
    c = 1,
    d
  };

  // 使用变量，递增也会报错
  const Start = 1;
  enum Index {
    a = Start,
    // b // 报错
  }
}