### Typescript环境搭建

项目目录一览：

 - src: 用于存放项目相关资源

    - utils: 和业务相关的可复用方法

    - tools: 和业务无关的纯工具函数

    - assets: 图片字体等静态资源

    - api: 可复用的接口请求方法

    - config: 配置文件

 - typings: 模块声明文件

 - build: webpack构建配置

```bash
 tslint -i
```

```JSON
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {},
    "rulesDirectory": []
}
```

 - defaultSeverity是提醒级别，如果为error则会报错，如果为warning则会警告，如果设为off则关闭，那TSLint就关闭了；
 
 - extends可指定继承指定的预设配置规则；
 
 - jsRules用来配置对.js和.jsx文件的校验，配置规则的方法和下面的rules一样；
 
 - rules是重点了，我们要让TSLint根据怎样的规则来检查代码，都是在这个里面配置，比如当我们不允许代码中使用eval方法时，就要在这里配置"no-eval": true；
 
 - rulesDirectory可以指定规则配置文件，这里指定相对路径。