// 索引类型
{
  interface RoleDic {
    [id: number]: string;
  }

  const role1: RoleDic = {
    0: 'super_admin',
    1: 'admin'
  };

  // const role2: RoleDic = {
  // a: 'admin' // 报错，索引必须要是数字类型
  // }

  const role3: RoleDic = ['admin', 'super_admin']; // 不会报错
}

// 继承接口原需求
{
  interface Vegetables {
    color: string;
  }
  interface Tomato {
    color: string;
    radius: number;
  }
  interface Carrot {
    color: string;
    length: number;
  }
}

// 使用继承的方式
{
  interface Vegetables {
    color: string;
  }
  interface Tomato extends Vegetables {
    radius: number;
  }
  interface Carrot extends Vegetables {
    length: number;
  }
  // const tomato: Tomato = {
  //   radius: 1.2 // error  Property 'color' is missing in type '{ radius: number; }'
  // };
  const carrot: Carrot = {
    color: "orange",
    length: 20
  };
}

// 多继承
{
  interface Vegetables {
    color: string;
  }
  interface Food {
    type: string;
  }
  interface Tomato extends Food, Vegetables {
    radius: number;
  }

  const tomato: Tomato = {
    type: "vegetables",
    color: "red",
    radius: 1.2
  };
}

// 混合类型接口
{
  interface Counter {
    (): void; // 这里定义Counter这个结构必须包含一个函数，函数的要求是无参数，返回值为void，即无返回值
    count: number; // 而且这个结构还必须包含一个名为count、值的类型为number类型的属性
  }
  const getCounter = (): Counter => { // 这里定义一个函数用来返回这个计数器
    const c = () => { // 定义一个函数，逻辑和前面例子的一样
      c.count++;
    };
    c.count = 0; // 再给这个函数添加一个count属性初始值为0
    return c; // 最后返回这个函数对象
  };
  const counter: Counter = getCounter(); // 通过getCounter函数得到这个计数器
  counter();
  console.log(counter.count); // 1
  counter();
  console.log(counter.count); // 2
}