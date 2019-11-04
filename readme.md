## Git

Создать директорию для проекта

Открыть терминал и перейти в директорию проекта

Проинициализировать git репозиторий

```
$ git init
```

Добавить в корень проекта файл .gitignore
Сгенерировать стандартный .gitignore можно по ссылке [Сгенерировать](https://gitignore.io/api/node,webstorm)

## NPM

Ознакомиться с командой npm help:

```
$ npm help
```

С помощью встроенной справки изучить команду npm init

```
$ npm help init
```

Инициализировать новый проект, используя npm init и отвечая на все вопросы

```
$ npm init
```

Изучить полученный файл package.json и, при необходимости, отредактировать

Скопировать дирикторию /src и файлы index.html, index.babel.html и index.modules.html на github-е в ваш проект 

Установить глобально [http-server](https://www.npmjs.com/package/http-server)

```
$ npm install --save-dev http-server
```

Запустить http-server из корня проекта

```
$ npx http-server
```

Проверить работоспособность приложения в браузере, открыв http://localhost:8080/index.html

### Знакомство с babel

[What is Babel?](https://babeljs.io/docs/en)

Установить @babel/core @babel/cli

```
$ npm install --save-dev @babel/core @babel/cli
```

Установить пресет @babel/preset-env

```
$ npm install --save-dev @babel/preset-env
```

Создать в корне проекта файл `.babelrc` и включить preset [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)

```
 "presets": [
    [
      "@babel/preset-env",
      {
         "targets": {
            "browsers": ["last 2 versions"]
         }
      }
    ]
  ],

```

В scripts секцию файла package.json добавить команду build, которая весь js из /src скомпилирует используя babel в /build

```
{
...
  "scripts": {
    "build": "babel src/single -d build"
  },
...
 }
```

Откройте файл index.babel.html. В нем подключен javascript файл из /build.

Проверить работоспособность, открыв http://localhost:8080/index.babel.html, и изучить полученный код в /build

Подключить полифил

```
$ npm install --save babel-polyfill
```



```   
File: babel.rc

  [
      "@babel/preset-env",
      {
          ....
          "useBuiltIns": "usage"
      }
    ]

```

Пересобрать проект, изучить полученный код
Изучить параметр target для пресета, проследить как при его изменении в файле `.babelrc` меняется сгенерированный код

Примеры:

```
"targets": {
   "browsers": ["last 2 versions"]
}
```

```
"targets": {
  "chrome": 70
}
```

```
"targets": {
     "browsers": [
        ""last 2 versions",
        "> 5%",
         "IE 10"]
}

```

Добавить js код использующий, предложенный синтаксис для optional-chaining.

Для этого откройте файл src/single/index.js и измените код следующим образом

```js
// document.getElementById('userInfoStreet').innerText = user.address && user.address.street || '';
document.getElementById("userInfoStreet").innerText =
  user.address?.street || "";
```

[Optional chaining proposal](https://github.com/tc39/proposal-optional-chaining)
[Proposals](https://github.com/tc39/proposals)

Попробуйте пересобрать проект. Скорее всего вы получите ошибку

> SyntaxError: build/src/index.js: Support for the experimental syntax 'optionalChaining' isn't currently enabled

Для поддержки optional chaining необходимо подключить соответствующий плагин для babel

[babel-plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)



```
FILE: .babelrc
{
  ....
  "plugins": ["@babel/plugin-proposal-optional-chaining"]
}

```

Пересобрать проект. Проанализировать сгенерированный код

### Webpack

[Webpack](https://webpack.js.org/)

Для изучения webpack будем использовать исходники из /src/modules и index.modules.html. Изучите их

Установить webpack

```js
npm install webpack webpack-cli --save-dev
```

Создать webpack.config.js в корне проекта

```js  
FILE: webpack.config.js

const path = require("path");

module.exports = {
  entry: "./src/modules/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

Собрать проект, используя webpack, и изучить исходники в /dist

```
$ npx webpack
```

Открыть http://localhost:8080/index.modules.html. Страница будет застилизована в следующих шагах.
Подключить source map


```js
File: webpack.config.js

module.exports = {
   ...
  devtool: 'source-map'
};
```

Пересобрать проект

Посмотреть исходники в chrome developer tools - вкладка Sources

Изменить в webpack.config.js devtools на 'eval', пересобрать проект и просмотреть исходники в chrome dev tools

Добавить babel к webpack

```
$ npm install -D babel-loader
```

```js
FILE: webpack.config.js
....
module: {
  rules: [
      {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
              loader: 'babel-loader',

          }
      }
  ],

},

```

Пересобрать проект и изучить код d /dist

### Загрузка css

```
$ npm install --save-dev style-loader css-loader
```

```js  
FILE: webpack.config.js
.....
  module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
```

Во всех js файлах в /src/modules/ раскомментировать подключение css

Пересобрать проект

### Prettier

Информация о [prettier](https://prettier.io/)

Добавить prettier в dev зависимости

```
$ npm install prettier --save-dev --save-exact
```

Добавить в package.json скрипт для форматирования кода всего проекта

```js    
FILE: package.json

"scripts": {
    ...
    "format": "prettier --write \"src/**/*.js\""
  },

```

Отформатируйте исходники

```js
$ npm run format
```

Добавить файл конфигурации prettier в проект


```js
FILE .prettierrc

{
"printWidth": 120,
"singleQuote": true,
"useTabs": false,
"tabWidth": 2,
"semi": true,
"bracketSpacing": true
}
```

Переформатировать исходники

```js
$ npm run format
```

Изменить настройки в файле .prettierrc и переформатировать исходники, проследить как будет изменяться полученный код

### Eslint

[Eslint](https://eslint.org/docs/about/)

Добавить и сконфигурировать eslint

Добавить скрипт для проверки eslint-ом всех файлов проекта

```js
$ npm install eslint --save-dev
```




При инициализации eslint-а выберите следующие варианты
```js
? How would you like to use ESLint? To check syntax and find problems
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? None of these
? Does your project use TypeScript? No
? Where does your code run? (Press <space> to select, <a> to toggle all, <i> to invert selection)Browser
? What format do you want your config file to be in? JSON

```

```js
$ npx eslint --init
```

Изучить файл .eslintrc.json
Запустить линтер на исходниках проекта

```js
$ npx eslint src/**/*.js
```

Добавить скрипт для форматирования всего проекта в package.json
Исправить несколько ошибок 

### Git pre-commit hooks

Используя [husky](https://github.com/typicode/husky) настроить git pre-commit hooks так что бы при каждом коммите измененные файлы форматировались и весь проект проходил проверку eslint-ом

```js
$ npm i -D husky
$ npm -i -D pretty-quick
```

```js
FILE: package.json

 "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged && npm run lint"
    }
  }

```

Закомитить изменения
