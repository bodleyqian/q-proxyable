/**
 * @author qianzhixiang
 * @email qianzhixiang@htsc.com
 * @create date 2020-05-28 16:02:39
 * @modify date 2020-05-28 16:02:39
 * @desc [让一个对象变的可监听]
 * 能够对一个数据的属性的增改查做出监听
 */

import {
  GlobalGetFunc,
  GlobalSetFunc,
  GlobalDeleteFunc,
  IProxyHandlerObject,
  IProxyOption,
} from './interface';
import { suportProxy } from './utils';
import { ProxyableByProxy } from './proxy';
import { ProxyableByDefineProperty } from './defineProperty';
import { GLOBAL_PROXY_HANDLERS } from './common';

export function Proxyable<T extends object>(value: T, option?: IProxyOption<T>) {
  if (suportProxy()) {
    return ProxyableByProxy(value, option);
  }
  return ProxyableByDefineProperty(value, option);
}

/**
 *  给Proxy对象添加全局处理函数
 *  只要对象有变动，都会触发函数
 *
 */
export function addProxyHandler(handlers: {
  get?: GlobalGetFunc;
  set?: GlobalSetFunc;
  delete?: GlobalDeleteFunc;
}) {
  //
  for (const i in handlers) {
    GLOBAL_PROXY_HANDLERS[i as keyof typeof GLOBAL_PROXY_HANDLERS]!.push(
      handlers[i as keyof typeof GLOBAL_PROXY_HANDLERS] as any, // 丑陋的any
    );
  }
}
