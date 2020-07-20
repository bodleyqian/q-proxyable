/**
 * @author qianzhixiang
 * @email qianzhixiang@htsc.com
 * @create date 2020-07-20 15:25:26
 * @modify date 2020-07-20 15:25:26
 * @desc [koa应用初始化的地方，之所以在这里初始化时为了防止在其他有可能要用到的地方引用它]
 */
import koa from 'koa';
import { Injectable } from 'qzx-ioc';
import Config from './config';
import _ from 'lodash';

@Injectable()
export default class App {
  private app = new koa();
  constructor(private $config: Config) {}
  getInstance() {
    return this.app;
  }

  start(port: number = this.$config.PORT, interceptors = this.$config.INTERCEPTORS) {
    // 设置cookie的keys
    if (!_.isEmpty(this.$config.KEYS)) {
      this.app.keys = this.$config.KEYS;
    }
    // 加载拦截器
    interceptors.forEach((interceptor) => this.app.use(interceptor));
    // 启动App
    this.app.listen(port);
  }
}
