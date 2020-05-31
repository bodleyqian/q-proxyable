# 响应式 REACT 工具

> q-reactive-react 主要赋予了 react 能响应式更新的功能。

响应式更新包括两个部分：

1. 数据发生了改变，组件能够自动更新，而不需要手动 setState
2. 数据发生了改变，组件不需要全部更新，只更新和数据相关的组件。

如此一来，能够带来两个直观的好处：

1. 开发可以更加专注于逻辑层。
2. 即使一个组件很大，你也不用担心重新渲染带来的额外消耗，所有的组件都能够知道自己什么时候能更新。性能更好。

## 使用实例

### 最简单的、类 vue 写法使用

```typescript
import {QComponent} from 'q-reactive-react';
import React, {Component} from 'react';

@QComponent()
export class Test extends Component {
  count = 10;
  render() {
    return <>
      <div onClick={() => this.count++}>
        {this.count}
      </div>
    <>
  }
}

```

如上所示，简单、直观。你甚至还可以这样：

```typescript
import {QComponent, Proxyable} from 'q-reactive-react';
import React, {Component} from 'react';

const user = Proxyable({age: 10})

@QComponent()
export class Test extends Component {
  count = 10;
  render() {
    return <>
      <div onClick={() => this.count++}>
        {this.count}
      </div>
      <div onClick={() => user.age++}>
        {user.age}
      </div>
    <>
  }
}

```

这里主要还是利用了 es6 的特性： Proxy,能够监听对象的变化。

你不需要过多的关心，你只要知道，proxyable 后的数据，可以随便使用。但是没有 proxyable 的肯定不可以自动更新。

**Component 自动的进行了 Proxyable**

你可能会好奇，为什么 Test 组件里面没有使用 Proxyable 呢，这里其实主要还是 Qcomponent 已经帮你做过了。

你可以使用 Proxyable 也可以不使用，效果一样。

### 依赖更新

**Test2.tsx**

```typescript
import {QComponent, Prop, Proxyable} from 'q-reactive-react';
import React, {Component} from 'react';


@QComponent()
export class Test2 extends Component<{age: number}, any> {
  @Prop() age!: number;
  render() {
    console.log('test2 renderd');
    return <>
      <div>
        {this.age}
      </div>
    <>
  }
}
```

**Test3.tsx**

```typescript
import {QComponent, Prop, Proxyable} from 'q-reactive-react';
import React, {Component} from 'react';


@QComponent()
export class Test3 extends Component<{count: number}, any> {
  @Prop() count!: number;
  render() {
    console.log('test3 renderd');
    return <>
      <div>
        {this.count}
      </div>
    <>
  }
}
```

**Test.tsx**

```typescript
import {QComponent} from 'q-reactive-react';
import React, {Component} from 'react';
import {Test2} from './Test2';
import {Test3} from './Test3';

@QComponent()
export class Test extends Component {
  data = {
    age: 1,
    count: 1
  }
  render() {
    return <>
      <div onClick={() => this.data.age++}>
        <Test2 age={this.data.age}>
      </div>
       <div onClick={() => this.data.count++}>
        <Test2 age={this.data.count}>
      </div>
    <>
  }
}
```

如果点击 age, 你会发现只打印了"test3 renderd"

如果点击 count, 你会发现只打印了 "test2 renderd"

你不需要知道怎么去更新这些组件，QComponent 都帮你弄好了
