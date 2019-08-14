{
  interface Info {
    age: number
  }
  interface InfoReadonly {
    readonly age: number
  }
  type ReadonlyType <T> = {
    readonly [P in keyof T]: T[P]
  }
  type ReadonlyInfo = ReadonlyType<Info>;
  var myInfo: ReadonlyInfo = {
    age: 18
  };
  // myInfo.age = 19; // 报错： Cannot assign to 'age' because it is a read-only property
}

// Pick
{
  interface Info {
    name: string,
    age: number,
    address: string
  }
  const info: Info = {
    name: 'James',
    age: 18,
    address: 'Shanghai'
  };
  var pick = function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    let res = {} as Pick<T, K>;
    keys.forEach(key => {
      res[key] = obj[key]
    });
    return res;
  };
  const nameAndAddress = pick(info, ['name', 'address']);
}

// Recond 
{
  const mapObj = function mapObj<K extends string | number, T, U>(
    obj: Record<K, T>, 
    f: (x: T) => U
  ): Record<K, U> {
    let res = {} as Record<K, U>;
    for(let key in obj) {
      res[key] = f(obj[key]);
    }
    return res;
  };
  const names = {
    0: 'hello',
    1: 'world',
    2: 'bye'
  };
  const lengths = mapObj(names, s => s.length);
}

// 逆向操作
{
  type Proxy<T> = {
    get(): T,
    set(value: T): void
  }; // 定义一个映射类型
  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  }; // 再定义一个映射类型，将对象的属性值类型都变成Proxy处理后的类型
  var proxify = function proxify<T>(obj: T): Proxify<T> {
    let result = {} as Proxify<T>;
    for(let key in obj) {
      result[key] = {
        get: () => obj[key],
        set: (value) => obj[key] = value
      };
    }
    return result;
  };

  let props = {
    name: 'James',
    age: 18
  };
  let proxyProps = proxify(props);
  console.log(proxyProps.name.get()); // James
  proxyProps.age.set(20);

  // 拆包操作
  var unproxify = function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for(let i in t) {
      result[i] = t[i].get();
    }
    return result;
  };
  let originalProps = unproxify(proxyProps);
}

// 添加或者移除修饰符
{
  interface Info {
    name: string,
    age: number
  }
  type ReadonlyInfo<T> = {
    +readonly [P in keyof T] +?: T[P]
  };
  let info: ReadonlyInfo<Info> = {
    name: 'James'
  };
  // info.name = ''; // 报错 只读属性

  type RemoveModifier<T> = {
    -readonly [P in keyof T] -?: T[P]
  };
  type InfoType = RemoveModifier<Readonly<Partial<Info>>>;
  let info1: InfoType = {
    name: 'James', // 这一项不再是Readonly
    age: 23, // 这一项已经是必输项，不是可选项
  };
  info1.name = ''; // 没有报错，
}