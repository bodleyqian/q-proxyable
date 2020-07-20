/**
 * @author qianzhixiang
 * @email qianzhixiang@htsc.com
 * @create date 2020-07-20 14:46:37
 * @modify date 2020-07-20 14:46:37
 * @desc [程序入口处]
 */
import { Ioc } from 'qzx-ioc';
import App from './app';

const $app = Ioc(App);

$app.start();
