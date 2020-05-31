# q-proxyable

> 一个简单的让对象、数组变得可被监听的库

```javascript
import { Proxyable } from 'q-proxyable';
const arr = Proxyable([1], {
  get(target, prop, value) {
    console.log(prop, value);
  },
});
```

## 支持 Proxy . DefineProperty

1. 当系统支持 proxy 的时候，自动使用 proxy,否则使用 DefineProperty
2. 对数组的方法进行了改写，DefineProperty 模式下能够监听到 length 的变化

## 支持全局增加监听事件

```javascript
addProxyHandler({
  get(target, prop, value) {},
});
```

所有的被代理的对象、数组都可以在这里被监听到。
